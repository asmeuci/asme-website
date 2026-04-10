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

const EMBED_VISIBLE_HEIGHT = 540;
const EMBED_TOP_CROP = 58;
const EMBED_BOTTOM_CROP = 76;
const EMBED_TOTAL_HEIGHT =
  EMBED_VISIBLE_HEIGHT + EMBED_TOP_CROP + EMBED_BOTTOM_CROP;

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
                <div
                  className="relative mx-auto w-full overflow-hidden rounded-xl border border-zinc-200 bg-white"
                  style={{ height: EMBED_VISIBLE_HEIGHT }}
                >
                  <iframe
                    src={toEmbedUrl(postLink)}
                    className="absolute left-0 w-full"
                    style={{
                      top: -EMBED_TOP_CROP,
                      height: EMBED_TOTAL_HEIGHT,
                    }}
                    loading="lazy"
                    scrolling="no"
                    allow="encrypted-media"
                    title={`Instagram post ${postLink}`}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export default Events;
