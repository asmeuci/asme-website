import Layout from "../components/Layout";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";

const postLinks = [
  "https://www.instagram.com/p/DW0Q3sLlNFv/",
  "https://www.instagram.com/p/DW77QwhioYp/",
  "https://www.instagram.com/p/DW5FkAYFGRS/",
  "https://www.instagram.com/p/DW2jqT5qS1g/",
  "https://www.instagram.com/p/DWy7pwgii3Y/",
  "https://www.instagram.com/p/DWxs7edCk2u/",
];

const EMBED_TOP_CROP = 58;
const EMBED_BOTTOM_CROP = 170;

function toEmbedUrl(postUrl: string) {
  return `${postUrl.replace(/\/$/, "")}/embed`;
}

function Events() {
  return (
    <Layout>
      <Section className="bg-[#f1f0ea]">
        <div className="container mx-auto">
          <h1 className="flex justify-center p-20 font-helvetica text-[40px]">
            Recent Posts
          </h1>
          <div className="grid gap-8 bg-[#f1f0ea] sm:grid-cols-2 lg:grid-cols-3">
            {postLinks.map((postLink) => (
              <Reveal key={postLink} width="100%">
                <a
                  href={postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mx-auto block aspect-[4/5] w-full overflow-hidden rounded-xl border border-zinc-200 bg-white"
                >
                  <iframe
                    src={toEmbedUrl(postLink)}
                    className="pointer-events-none absolute left-0 w-full"
                    style={{
                      top: -EMBED_TOP_CROP,
                      height: `calc(100% + ${EMBED_TOP_CROP + EMBED_BOTTOM_CROP}px)`,
                    }}
                    loading="lazy"
                    scrolling="no"
                    allow="encrypted-media"
                    title={`Instagram post ${postLink}`}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export default Events;
