import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import eventRnn from "@/assets/home/event-rnn.jpg";
import eventSdnn from "@/assets/home/event-sdnn.jpg";
import eventNetwork from "@/assets/home/event-network.jpg";
import projectHpvc from "@/assets/home/project-hpvc.jpg";
import projectPeterworks from "@/assets/home/project-peterworks.jpg";
import bentoMain from "@/assets/home/bento-main.jpg";

type SectionTemplate = {
  name: string;
  eventTitle: string;
  eventGroups: {
    subheading: string;
    photos: string[];
  }[];
};

const EVENT_NAME_PLACEHOLDER = "Insert event name here";

const SECTION_TEMPLATES: Record<string, SectionTemplate> = {
  professional: {
    name: "Professional",
    eventTitle: "Professional Event Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
  social: {
    name: "Social",
    eventTitle: "Social Event Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
  networking: {
    name: "Networking",
    eventTitle: "Networking Event Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
  boothing: {
    name: "Boothing",
    eventTitle: "Boothing Event Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
  flagship: {
    name: "Flagship",
    eventTitle: "Flagship Event Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
  misc: {
    name: "Misc",
    eventTitle: "Miscellaneous Highlights",
    eventGroups: [
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [eventRnn, eventSdnn, eventNetwork],
      },
      {
        subheading: EVENT_NAME_PLACEHOLDER,
        photos: [projectHpvc, projectPeterworks, bentoMain],
      },
    ],
  },
};

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
          <p className="max-w-3xl font-helvetica text-base text-zinc-700 md:text-lg">...</p>
          <Link
            to="/yearbook"
            className="mt-1 inline-flex rounded-full border border-zinc-800 px-4 py-1.5 font-helvetica text-sm transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Back to Folders
          </Link>
        </div>

        <div className="mt-6 border-t-[0.5px] border-zinc-700 pt-7" />

        <div className="space-y-10">
          {config.eventGroups.map((group, groupIndex) => (
            <div key={`${config.name}-${groupIndex}`} className="space-y-4">
              <h2 className="font-helvetica text-left text-2xl md:text-3xl">
                {group.subheading}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.photos.map((photo, index) => (
                  <div key={`${group.subheading}-${index}`} className="overflow-hidden rounded-xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
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
      </Section>
    </Layout>
  );
}

export default YearbookSection;
