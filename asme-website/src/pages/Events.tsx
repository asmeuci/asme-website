import Layout from "../components/Layout";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";

const postLinks = [
  "https://www.instagram.com/p/DYTcfszqbtK/",
  "https://www.instagram.com/p/DYJXFNEFJH-/",
  "https://www.instagram.com/p/DX-2NnGFDPO/",
  "https://www.instagram.com/p/DYLoKJgEpOC/",
  "https://www.instagram.com/p/DYLhR53ksNa/",
  "https://www.instagram.com/p/DYGjdxMFB5H/",
];

const linksPost = [
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
  {
    name: "Pacifica",
    image: "LI_posts/Pacifica.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_%F0%9D%90%96%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A7-%F0%9D%90%88-%F0%9D%90%B0%F0%9D%90%9A%F0%9D%90%AC-%F0%9D%90%B2%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%A7%F0%9D%90%A0%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%88-%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%9D-activity-7457791361661124610-lp9r?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
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
          <h1 className="flex justify-center p-20 font-helvetica text-[40px]">
            Recent Instagram Posts
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
          <h1 className="flex justify-center p-20 font-helvetica text-[40px]">
            Recent Linkedin Posts
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
