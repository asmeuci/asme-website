import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { priceIdFor, tierById } from './_tiers';
import { getSupabaseAdmin } from './_supabase';

const MAX_RESUME_BYTES = 2 * 1024 * 1024;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const safeFilenamePart = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'Participant';

type ResumePayload = {
  name?: unknown;
  size?: unknown;
  type?: unknown;
  base64?: unknown;
};

const requiredText = (
  body: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
): string => {
  const value = typeof body[key] === 'string' ? body[key].trim() : '';
  if (!value) throw new Error(`${label} is required.`);
  if (value.length > maxLength) throw new Error(`${label} is too long.`);
  return value;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ error: 'Payments are not configured yet.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  try {
    const firstName = requiredText(body, 'firstName', 'First name', 100);
    const lastName = requiredText(body, 'lastName', 'Last name', 100);
    const email = requiredText(body, 'email', 'Email', 254).toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const tier = tierById(body.tier);
    if (!tier) {
      return res.status(400).json({ error: 'Please choose a ticket type.' });
    }

    const dietaryRestrictions =
      typeof body.dietaryRestrictions === 'string' ? body.dietaryRestrictions.trim() : '';
    if (dietaryRestrictions.length > 500) {
      return res.status(400).json({ error: 'Dietary restrictions must be 500 characters or fewer.' });
    }

    const priceId = priceIdFor(tier);
    if (!priceId) {
      console.error(`Missing ${tier.envVar} for ticket level "${tier.id}"`);
      return res.status(500).json({ error: 'That ticket type is not available right now.' });
    }

    const preference1 = requiredText(body, 'preference1', 'First company preference', 36);
    const optionalPreferences = ['preference2', 'preference3']
      .map((key) => (typeof body[key] === 'string' ? body[key].trim() : ''))
      .filter(Boolean);
    const preferences = [preference1, ...optionalPreferences];

    if (preferences.some((id) => !UUID_PATTERN.test(id))) {
      return res.status(400).json({ error: 'Please choose companies from the provided list.' });
    }
    if (new Set(preferences).size !== preferences.length) {
      return res.status(400).json({ error: 'Please choose a different company for each preference.' });
    }

    const resume = (body.resume ?? {}) as ResumePayload;
    const resumeName = typeof resume.name === 'string' ? resume.name.trim() : '';
    const resumeSize = typeof resume.size === 'number' ? resume.size : Number.NaN;
    const resumeType = typeof resume.type === 'string' ? resume.type : '';
    const resumeBase64 = typeof resume.base64 === 'string' ? resume.base64 : '';
    const resumeSupplied = Boolean(
      resumeName || resumeBase64 || resumeType || (Number.isFinite(resumeSize) && resumeSize > 0),
    );
    let resumeBytes: Buffer | null = null;

    if (resumeSupplied) {
      if (!resumeName || !resumeBase64) {
        return res.status(400).json({ error: 'The resume upload is incomplete. Please try again.' });
      }
      if (!resumeName.toLowerCase().endsWith('.pdf') || resumeType !== 'application/pdf') {
        return res.status(400).json({ error: 'The resume must be a PDF.' });
      }
      if (!Number.isInteger(resumeSize) || resumeSize <= 0 || resumeSize > MAX_RESUME_BYTES) {
        return res.status(400).json({ error: 'The resume must be 2 MB or smaller.' });
      }

      resumeBytes = Buffer.from(resumeBase64, 'base64');
      if (
        resumeBytes.length !== resumeSize
        || resumeBytes.length > MAX_RESUME_BYTES
        || resumeBytes.subarray(0, 5).toString('ascii') !== '%PDF-'
      ) {
        return res.status(400).json({ error: 'The uploaded file is not a valid PDF.' });
      }
    }

    const supabase = getSupabaseAdmin();
    const { data: activeCompanies, error: companiesError } = await supabase
      .from('network_companies')
      .select('id')
      .eq('active', true)
      .in('id', preferences);

    if (companiesError) throw companiesError;
    if (!activeCompanies || activeCompanies.length !== preferences.length) {
      return res.status(400).json({ error: 'One of the selected companies is no longer available.' });
    }

    const { data: existingPaid, error: existingError } = await supabase
      .from('network_registrations')
      .select('id')
      .eq('email', email)
      .eq('payment_status', 'paid')
      .limit(1);

    if (existingError) throw existingError;
    if (existingPaid && existingPaid.length > 0) {
      return res.status(409).json({ error: 'A paid registration already exists for this email.' });
    }

    const registrationId = randomUUID();
    const resumePath = resumeBytes
      ? `${registrationId}/${safeFilenamePart(firstName)}_${safeFilenamePart(lastName)}.pdf`
      : null;
    let resumeUploaded = false;
    let registrationCreated = false;

    try {
      if (resumePath && resumeBytes) {
        const { error: uploadError } = await supabase.storage
          .from('network-resumes')
          .upload(resumePath, resumeBytes, {
            contentType: 'application/pdf',
            upsert: false,
          });

        if (uploadError) throw uploadError;
        resumeUploaded = true;
      }

      const { error: registrationError } = await supabase
        .from('network_registrations')
        .insert({
          id: registrationId,
          first_name: firstName,
          last_name: lastName,
          email,
          company_preference_1: preferences[0],
          company_preference_2: preferences[1] ?? null,
          company_preference_3: preferences[2] ?? null,
          resume_path: resumePath,
          resume_original_name: resumeBytes ? resumeName.slice(0, 255) : null,
          resume_size_bytes: resumeBytes?.length ?? null,
          resume_mime_type: resumeBytes ? 'application/pdf' : null,
          tier: tier.id,
          dietary_restrictions: dietaryRestrictions || null,
        });

      if (registrationError) throw registrationError;
      registrationCreated = true;

      const host = req.headers.host ?? '';
      const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
      const origin = process.env.PUBLIC_SITE_URL || `${isLocal ? 'http' : 'https'}://${host}`;
      const stripe = new Stripe(stripeSecretKey);
      const metadata = {
        registration_id: registrationId,
        name: `${firstName} ${lastName}`,
        tier: tier.id,
      };

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: email,
        metadata,
        payment_intent_data: { metadata },
        success_url: `${origin}/network/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/network/register?canceled=1`,
      });

      if (!session.url) throw new Error('Stripe did not return a Checkout URL');

      const { error: sessionUpdateError } = await supabase
        .from('network_registrations')
        .update({ stripe_checkout_session_id: session.id })
        .eq('id', registrationId);

      if (sessionUpdateError) {
        if (session.status === 'open') {
          await stripe.checkout.sessions.expire(session.id).catch(() => undefined);
        }
        throw sessionUpdateError;
      }

      return res.status(200).json({ url: session.url });
    } catch (error) {
      if (registrationCreated) {
        await supabase.from('network_registrations').delete().eq('id', registrationId);
      }
      if (resumeUploaded && resumePath) {
        await supabase.storage.from('network-resumes').remove([resumePath]);
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof Error && (error.message.endsWith(' is required.') || error.message.endsWith(' is too long.'))) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Registration checkout failed', error);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
