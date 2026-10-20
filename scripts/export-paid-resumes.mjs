import { createWriteStream } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { once } from 'node:events';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'network-resumes';
const PAGE_SIZE = 500;
const OUTPUT_DIRECTORY = path.resolve('exports');

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim();

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const sanitizeFilenamePart = (value) =>
  String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'Participant';

const csvValue = (value) => {
  let text = value == null ? '' : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
};

const toCsv = (rows) => {
  const columns = [
    'registration_id',
    'registered_at',
    'paid_at',
    'first_name',
    'last_name',
    'email',
    'ticket',
    'company_choice_1',
    'company_choice_2',
    'company_choice_3',
    'dietary_restrictions',
    'resume_original_name',
    'resume_path',
    'exported_filename',
  ];

  return [
    columns.map(csvValue).join(','),
    ...rows.map((row) => columns.map((column) => csvValue(row[column])).join(',')),
  ].join('\r\n');
};

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
  }
  return value >>> 0;
});

const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const dosDateTime = (date = new Date()) => {
  const year = Math.max(1980, date.getFullYear());
  return {
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
  };
};

class ZipWriter {
  constructor(filePath) {
    this.stream = createWriteStream(filePath, { flags: 'wx' });
    this.entries = [];
    this.offset = 0;
  }

  async write(buffer) {
    if (!this.stream.write(buffer)) await once(this.stream, 'drain');
    this.offset += buffer.length;
  }

  async add(filename, content) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const name = Buffer.from(filename.replaceAll('\\', '/'), 'utf8');
    const checksum = crc32(data);
    const timestamp = dosDateTime();
    const localOffset = this.offset;
    const header = Buffer.alloc(30);

    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6);
    header.writeUInt16LE(0, 8);
    header.writeUInt16LE(timestamp.time, 10);
    header.writeUInt16LE(timestamp.date, 12);
    header.writeUInt32LE(checksum, 14);
    header.writeUInt32LE(data.length, 18);
    header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(name.length, 26);
    header.writeUInt16LE(0, 28);

    await this.write(header);
    await this.write(name);
    await this.write(data);
    this.entries.push({ name, checksum, size: data.length, timestamp, localOffset });
  }

  async close() {
    const centralDirectoryOffset = this.offset;

    for (const entry of this.entries) {
      const header = Buffer.alloc(46);
      header.writeUInt32LE(0x02014b50, 0);
      header.writeUInt16LE(20, 4);
      header.writeUInt16LE(20, 6);
      header.writeUInt16LE(0x0800, 8);
      header.writeUInt16LE(0, 10);
      header.writeUInt16LE(entry.timestamp.time, 12);
      header.writeUInt16LE(entry.timestamp.date, 14);
      header.writeUInt32LE(entry.checksum, 16);
      header.writeUInt32LE(entry.size, 20);
      header.writeUInt32LE(entry.size, 24);
      header.writeUInt16LE(entry.name.length, 28);
      header.writeUInt16LE(0, 30);
      header.writeUInt16LE(0, 32);
      header.writeUInt16LE(0, 34);
      header.writeUInt16LE(0, 36);
      header.writeUInt32LE(0, 38);
      header.writeUInt32LE(entry.localOffset, 42);
      await this.write(header);
      await this.write(entry.name);
    }

    const centralDirectorySize = this.offset - centralDirectoryOffset;
    const footer = Buffer.alloc(22);
    footer.writeUInt32LE(0x06054b50, 0);
    footer.writeUInt16LE(0, 4);
    footer.writeUInt16LE(0, 6);
    footer.writeUInt16LE(this.entries.length, 8);
    footer.writeUInt16LE(this.entries.length, 10);
    footer.writeUInt32LE(centralDirectorySize, 12);
    footer.writeUInt32LE(centralDirectoryOffset, 16);
    footer.writeUInt16LE(0, 20);
    await this.write(footer);

    this.stream.end();
    await once(this.stream, 'close');
  }
}

const loadPaidRegistrations = async () => {
  const registrations = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('network_registration_export')
      .select('*')
      .eq('payment_status', 'paid')
      .not('resume_path', 'is', null)
      .order('registered_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw new Error(`Could not load paid registrations: ${error.message}`);
    registrations.push(...data);
    if (data.length < PAGE_SIZE) break;
  }

  return registrations;
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const finalPath = path.join(OUTPUT_DIRECTORY, `paid-resumes-${timestamp}.zip`);
const partialPath = `${finalPath}.partial`;
let zip;

try {
  const registrations = await loadPaidRegistrations();
  if (registrations.length === 0) {
    console.log('No paid registrations with resumes were found.');
    process.exit(0);
  }

  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  zip = new ZipWriter(partialPath);
  const manifestRows = [];

  for (const [index, registration] of registrations.entries()) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .download(registration.resume_path);

    if (error) {
      throw new Error(
        `Could not download ${registration.resume_path} for ${registration.email}: ${error.message}`,
      );
    }

    const filename = [
      sanitizeFilenamePart(registration.last_name),
      sanitizeFilenamePart(registration.first_name),
      registration.registration_id,
    ].join('_') + '.pdf';

    await zip.add(`resumes/${filename}`, Buffer.from(await data.arrayBuffer()));
    manifestRows.push({ ...registration, exported_filename: filename });
    console.log(`[${index + 1}/${registrations.length}] ${filename}`);
  }

  await zip.add('paid-attendees.csv', toCsv(manifestRows));
  await zip.close();
  zip = null;
  await rename(partialPath, finalPath);
  console.log(`\nExported ${registrations.length} paid resume(s) to:\n${finalPath}`);
} catch (error) {
  zip?.stream.destroy();
  await rm(partialPath, { force: true });
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
