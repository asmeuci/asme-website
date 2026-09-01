import Layout from "../components/Layout";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";

const postLinks = [
  "https://www.instagram.com/p/DcZx5jBBSDY/",
  "https://www.instagram.com/p/DbcaQ7QlE5t/",
  "https://www.instagram.com/p/DZN6snwSiWd/",

];

const linksPost = [
   {
    name: "Board",
    image: "LI_posts/boardreveal.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_were-so-excited-to-reveal-the-asme-at-uci-activity-7488287475874881536-rRpT?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },
  {
    name: "Spring2026",
    image: "LI_posts/spring26.jpg",
    link: "https://www.linkedin.com/posts/as-summer-continues-were-excited-to-look-ugcPost-7486141628248678401-vID7/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },
  {
    name: "Anteater",
    image: "LI_posts/anteater.jpg",
    link: "https://www.linkedin.com/posts/asme-uci_we-are-thrilled-to-announce-that-asme-at-activity-7468789170426212354-x7Wp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF98p3MBHSLxP_XneJhowt4IrClHTzYhvZI",
  },

];


const EMBED_TOP_CROP = 53;
const EMBED_BOTTOM_CROP = 170;

function toEmbedUrl(postUrl: string) {
  return `${postUrl.replace(/\/$/, "")}/embed`;
}

function Events() {
  return (
    <Layout>
      {/* Title */}
      <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto]">
        <div className="container mx-auto ">
          <div className="mx-auto w-7/8">
              <div className="bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
                    RecenT PosTs 
                </h1>
              </div>
          </div>
        </div>
        </Section>
        {/*Instagram Posts*/}
        <Section>
          <div>
            <div className= "bg-[#f1f0ea] w-full">
              <h1 className="p-10 md:p-20 font-helvetica font-bold text-[45px] md:text-[50px] text-center bg-[#f1f0ea]">
                    Instagram
              </h1>
            </div>
            <div className="grid gap-8 bg-[#f1f0ea] sm:grid-cols-2 lg:grid-cols-3">
              {postLinks.map((postLink) => (
                <Reveal key={postLink} width="100%">
                  <a
                    href={postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mx-auto block aspect-[4/5] w-full overflow-hidden rounded-xl border border-zinc-300 bg-[#f1f0ea]"
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


      <Section className="bg-[#f1f0ea] rounded-xl">
        <div className="container mx-auto rounded-xl">
          <h1 className=" p-10 md:p-10 font-helvetica font-bold text-[45px] md:text-[50px] text-center">
            Linkedin
          </h1>
          <div className="grid gap-8 bg-[#f1f0ea] lg:grid-cols-3">
            {linksPost.map((link, index) => (
              <Reveal key={index} width="100%">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mx-auto block w-full overflow-hidden rounded-xl border border-zinc-300"
                >
                  <img
                    src={link.image}
                    alt={link.name}
                    className="w-full h-full object-contain"
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
