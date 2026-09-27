import Layout from "../components/Layout";
import Section from "../components/Section";

const highlights = [
  {
    title: "What is ASME at UCI?",
    description:
      "We're a student organization dedicated to professional development, helping students like you gain their footing in the engineering world and building you up from student to professional with workshops, networking, and much more!",
  },
  {
    title: "When are the general meetings?",
    description:
    "This quarter (Fall 2026) they are  held in MDEA, at Wednesdays at 6:30PM. For Week 1, it will be DCE270. Keep an eye out on the website and/or Instagram for any changes, as we usually have different meeting times on a quarterly basis. Hope to see you there!"
  },
  {
    title: "How do I contact your organization and/or board members?",
    description:
    "You can contact us in a variety of ways! You can email us at ASME@uci.edu, or Instagram at asmeatuci, or DM a board member on discord if they have a board member tag!"
  },
  {
    title: "I am representing a business interesting in supporting ASME@UCI. How do I do so?",
    description: "In our sponsors page, you are able to see our sponsorship package! Additionally, you can email asme@uci.edu or send a quick message using the text boxes on that page. We look forward to working with you!"
  },
  {
    title: "How do I get more information about anything that ASME offers?",
    description: "The website is a good place to find out any information about our major events, as well as RSVP forms! The website is updated regularly to ensure that viewers like you get the most up-to-date information."
  },
  {
    title:"What does ASME do outside of general meetings?",
    description: "We do a lot outside of general meetings! We occasionally do workshops and/or guest speakers to find out more about the industry. We also have our flagship events, where you can find out more, by hovering on Flagship (computer), or clicking on one of our 3 events! (mobile). Additionally, we like to have fun as well, with socials throughout the year!"
  },
  {
    title: "How do I get more involved with ASME?",
    description:"You can take your first steps by just showing up to meetings! One of our missions is to raise all engineering students from where you are now to an industry-ready professsional ready to take on the world. Additionally, you are able to participate in our board by either joining our intern program in the winter, or applying for board close to spring quarter!"
  },
  {
    title:"I have no engineering experience. Can ASME help me with this?",
    description:"Yes we can! We can build your technical experience with our program Peterworks, where you learn the basics of CAD all the way until you are CSWA-ready, which is the first of 3 levels of certificates in SolidWorks (free if you email lpreble@uci.edu if you are a student), and building a drone with a small team through the entire research, design, and testing process!"
  }
];

function FAQ() {
    return(
    <Layout>
        <div className="min-h-screen bg-[#f1f0ea]">
            <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto] py-0">
                <div className="container mx-auto md:w-7/8">
                    <div className="relative bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                        <img
                                src= "decorations/smiski.png"
                                alt= ""
                                className="absolute w-15 md:w-30 h-auto -bottom-10 md:-bottom-15 right-5 md:-right-15 rotate-30 transition-transform hover:scale-105">
                        </img>
                        <h1 className="px-5 py-8 md:px-12 md:py-12 font-scrap text-[40px] md:text-[64px] text-blue-400 text-center">
                            frequently Asked Questions
                        </h1>   
                    </div>
                </div>
            </Section>
            <Section className="bg-transparent pt-4 md:pt-15 pb-24 md:pb-32">

                <div className="space-y-10 ">
                    {highlights.map((item) => (
                        <div key={item.title} className="space-y-2">
                        <div className= "group relative flex flex-col justify-between p-6 bg-blue-200 border-zinc-400 rounded-lg">
                            <div className="flex items-start gap-3 md:gap-4 ">
                                <img
                                src="/gears.png"
                                alt="Peterworks icon"
                                className="h-8 flex-shrink-0 md:h-10"
                                />
                                <img
                                    src= "decorations/wave.png"
                                    alt= "decoration"
                                    className="absolute w-15 md:w-25 h-auto -bottom-5 md:-bottom-10 -left-5 md:-left-10 -rotate-30 transition-transform hover:scale-105">
                                </img>
                                <h3 className="font-helvetica font-semibold text-xl md:text-3xl">
                                {item.title}
                                </h3>
                            </div>
                            <p className="pl-11 font-helvetica text-base leading-relaxed md:pl-14 md:text-xl">
                                {item.description}
                            </p>
                            </div>
                        </div>
                    ))}
                    </div>
            </Section>
        </div>
    </Layout>
    )
}

export default FAQ;