import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Section from "@/components/Section";

type SectionTemplate = {
  name: string;
  eventTitle: string;
  eventGroups: {
    subheading: string;
    photos: string[];
  }[];
};

const SECTION_META: Record<string, Omit<SectionTemplate, "eventGroups">> = {
  professional: {
    name: "Professional",
    eventTitle: "Professional Events",
  },
  social: {
    name: "Social",
    eventTitle: "Social Events",
  },
  networking: {
    name: "Networking",
    eventTitle: "Networking Events",
  },
  boothing: {
    name: "Boothing",
    eventTitle: "Boothing Events",
  },
  flagship: {
    name: "Flagship",
    eventTitle: "Flagship Events",
  },
  misc: {
    name: "Misc",
    eventTitle: "Miscellaneous",
  },
};

const YEARBOOK_IMAGE_MODULES = import.meta.glob(
  "/src/assets/yearbook/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, import: "default" }
) as Record<string, string>;

function formatLabel(label: string) {
  return label
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function buildSectionTemplates() {
  const groupedBySection = new Map<string, Map<string, string[]>>();

  Object.entries(YEARBOOK_IMAGE_MODULES).forEach(([path, src]) => {
    const relativePath = path.split("/yearbook/")[1];
    if (!relativePath) {
      return;
    }

    const parts = relativePath.split("/");
    if (parts.length < 3) {
      return;
    }

    const sectionKey = parts[0].trim().toLowerCase();
    const eventName = formatLabel(parts[1]);
    if (!groupedBySection.has(sectionKey)) {
      groupedBySection.set(sectionKey, new Map());
    }

    const events = groupedBySection.get(sectionKey);
    if (!events) {
      return;
    }

    const existing = events.get(eventName) ?? [];
    existing.push(src);
    events.set(eventName, existing);
  });

  const allSectionKeys = Array.from(
    new Set([...Object.keys(SECTION_META), ...groupedBySection.keys()])
  );
  const templates: Record<string, SectionTemplate> = {};

  allSectionKeys.forEach((sectionKey) => {
    const meta = SECTION_META[sectionKey] ?? {
      name: formatLabel(sectionKey),
      eventTitle: `${formatLabel(sectionKey)} Events`,
    };
    const events = groupedBySection.get(sectionKey);
    const eventGroups =
      events == null
        ? []
        : Array.from(events.entries())
            .map(([subheading, photos]) => ({
              subheading,
              photos: photos.slice().sort((a, b) => a.localeCompare(b)),
            }))
            .sort((a, b) => a.subheading.localeCompare(b.subheading));

    templates[sectionKey] = {
      name: meta.name,
      eventTitle: meta.eventTitle,
      eventGroups,
    };
  });

  return templates;
}

const SECTION_TEMPLATES = buildSectionTemplates();

function YearbookSection() {
  const { section } = useParams();
  const key = section?.toLowerCase() ?? "";
  const config = SECTION_TEMPLATES[key];

  if (!config) {
    return <Navigate to="/yearbook" replace />;
  }

  return (
    <Layout>
      <Section className="bg-[#ececec] pt-36 md:pt-40">
        <div className="flex flex-col items-start gap-4">
          <p className="font-helvetica text-xs uppercase tracking-[0.18em] text-zinc-600">
            Yearbook / {config.name}
          </p>
          <h1 className="font-helvetica text-4xl md:text-5xl">{config.eventTitle}</h1>
          <Link
            to="/yearbook"
            className="mt-1 inline-flex rounded-full border border-zinc-800 px-4 py-1.5 font-helvetica text-sm transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Back to Folders
          </Link>
        </div>

        <div className="mt-6 border-t-[0.5px] border-zinc-700 pt-7" />

        {config.eventGroups.length === 0 ? (
          <p className="font-helvetica text-base text-zinc-700 md:text-lg">
            No photos found for this section yet.
          </p>
        ) : (
          <div className="space-y-10">
            {config.eventGroups.map((group, groupIndex) => (
              <div key={`${config.name}-${groupIndex}`} className="space-y-4">
                <h2 className="font-helvetica text-left text-2xl md:text-3xl">
                  {group.subheading}
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.photos.map((photo, index) => (
                    <div
                      key={`${group.subheading}-${index}`}
                      className="overflow-hidden rounded-xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                    >
                      <img
                        src={photo}
                        alt={`${group.subheading} gallery ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </Layout>
  );
}

export default YearbookSection;
