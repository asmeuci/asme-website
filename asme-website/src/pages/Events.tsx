import Layout from "../components/Layout";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";

const postLinks = [
  "https://www.instagram.com/p/DZN6snwSiWd/",
  "https://www.instagram.com/p/DZBie9VGF0O/",
  "https://www.instagram.com/p/DZAt4_rmPG_/",
  "https://www.instagram.com/p/DYvggePGLd_/",
  "https://www.instagram.com/p/DYvlRrTKH7U/",
  "https://www.instagram.com/p/DYplfHIqKMG/",
];

const linksPost = [
  {
    name: "Anteater",
    image: "LI_posts/anteater.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_we-are-thrilled-to-announce-that-asme-at-activity-7468789170426212354-x7Wp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },
  {
    name: "SDNN",
    image: "LI_posts/SDNN.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_asme-recently-hosted-our-senior-design-networking-activity-7459390661814013952-OWic?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },
  {
    name: "AIAA",
    image: "LI_posts/AIAA.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_uci-uciasme-uciaiaa-activity-7457883526752030720-4h2X?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },
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
        <div className="mx-auto w-2/3">
            <div className="bg-blue-900 rounded-[80px] flex justify-center md:mt-15 ">
              <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
                  RecenT PosTs 
              </h1>
            </div>
          </div>
             <h1 className=" p-10 md:p-20 font-scrap text-[45px] md:text-[50px] text-blue-400 text-center">
                  InsTagram
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
      <Section className="bg-[#f1f0ea]">
        <div className="container mx-auto">
          <h1 className=" p-10 md:p-0 font-scrap text-[45px] md:text-[50px] text-blue-400 text-center">
                  Linkedin
              </h1>
          <div className="grid gap-8 bg-[#f1f0ea] sm:grid-cols-2 lg:grid-cols-3">
            {linksPost.map((link, index) => (
              <Reveal key={index} width="100%">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mx-auto block  w-full overflow-hidden rounded-xl border border-zinc-200 hover:z-10 bg-white transition-transform group-hover:scale-105"
                >
                  <img
                    src={link.image}
                    alt={link.name}
                    className="w-full h-full object-contain"
                  >
                  </img>
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
