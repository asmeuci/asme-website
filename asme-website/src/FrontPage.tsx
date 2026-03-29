import asmeimg from '@/assets/site/home-hero-cover.png';
import rnn from '@/assets/home/event-rnn.jpg';
import sdnn from '@/assets/home/event-sdnn.jpg';
import network from '@/assets/home/event-network.jpg';
import hpvc from '@/assets/home/project-hpvc.jpg';
import peterworks from '@/assets/home/project-peterworks.jpg';
import './index.css';
import EventCard from './components/EventCard';
import BentoGallery from './components/BentoGallery';
import ProjectCard from './components/ProjectCard';
import { Reveal } from './components/Reveal';
import Layout from './components/Layout';
import Section from './components/Section';

interface EventItem {
  title: string;
  date: string;
  description: string;
  image: string; 
  tag: string;
}

const eventsData: EventItem[] = [
  {
    title: "Research Network Night",
    date: "",
    description: "Learn about research labs at UCI and what research is conducted. Connect with professors and graduate students to get the inside scoop of their work (and possibly help get into research)!",
    image: rnn,
    tag: "Event"
  },
  {
    title: "Senior Design Networking Night",
    date: "",
    description: "~14 design projects at UCI are invited to present about their project and network with students. Getting more face time with management and members of project can help when applying!",
    image: sdnn,
    tag: "Event"
  },
  {
    title: "Network with ASME",
    date: "",
    description: "Banquet-style dinner networking event where company representatives invited to talk to students and give them insights on their journey, life at X company, etc! Attendees included Northrop Grumman, ANSYS, Parker Aerospace, Johnson and Johnson, etc",
    image: network,
    tag: "Event"
  },
];

const projectsData: EventItem[] = [
  {
    title: "HPVC",
    date: "Jan 21 • 5 - 8 PM",
    description: "E-HPVC (Electric Human Powered Vehicle Challenge) is an annual collegiate engineering competition that’s designed to showcase student innovation, teamwork, and technical excellence. The event unites university teams from across the US to design, build, and race electric human-powered vehicles. The competition culminates in a series of dynamic challenges including design, drag, and endurance events. Student-lead teams directly compete against one another in various categories racking up points. The points earned from presentations and track events contribute to each team’s overall score, determining the winners of the competition.",
    image: hpvc,
    tag: "Event"
  },
  {
    title: "Peterworks",
    date: "Jan 21 • 5 - 8 PM",
    description: "PeterWorks is an application based SolidWorks and CAD development program designed to introduce students to 3D modeling and engineering design. Spanning Winter and Spring quarters, participants first learn core CAD skills such as part modeling, assemblies, simulations, and technical drawings, then apply those skills through hands-on fabrication by building a drone in teams. Open to all majors, the program emphasizes practical learning, collaboration, and industry-relevant skills, and was recognized with the “Best Program” award by UCI’s Engineering Student Council for two consecutive years.",
    image: peterworks,
    tag: "Event"
  },
];

function FrontPage() {
  return (
    <Layout>
      <div className="relative h-[80vh] md:h-screen w-full overflow-hidden flex flex-col items-center">
        <img 
            src={asmeimg} 
            className="h-full w-full object-cover object-center"
            alt="ASME banner" 
        />
        
        <div className="absolute bottom-16 z-20 animate-bounce pointer-events-none bg-white rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="black" 
            className="w-12 h-12 text-white opacity-80 drop-shadow-lg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      
        <div className="w-full bg-[#f1f0ea]">
        <Section className="">
          <Reveal>
            <div className="flex flex-col space-y-12">
                <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest mb-2">Who We Are</h2>
                <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">About ASME</h1>
            </div>
          </Reveal>
          <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
          <Reveal>
            <p className="font-helevtica font-normal text-lg md:text-2xl leading-relaxed pt-4 pb-14">
              ASME is a community of students and engineers dedicated to learning, collaboration, and hands-on innovation. We create opportunities for members to grow through technical projects, professional development, workshops, and networking events.
            </p>
          </Reveal>
          <Reveal width="100%">
              <BentoGallery/>
          </Reveal>
        </Section>

        {/* event section */}
        <Section className="">
          <Reveal>
            <div className="flex flex-col w-full">
                <div className="flex flex-col space-y-12">
                  <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest mb-2">Get Involved </h2>
                  <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Events</h1>
                </div>
            </div>              
          </Reveal>
          <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
          <Reveal>
            <p className="font-helevtica font-light text-lg md:text-xl leading-relaxed pt-4 pb-14">
                Explore the hands-on engineering challenges our teams are tackling this year.
            </p>
          </Reveal>
          <div className="flex flex-col gap-12">
            {eventsData.map((event, index) => (
              <Reveal key={index} width="100%">
                <EventCard 
                  event={event} 
                  isReversed={index % 2 !== 0} 
                />
              </Reveal>
            ))}
          </div>
        </Section>
        
        {/* project section */}
        <Section className="">
          <Reveal>
            <div className="flex flex-col space-y-12">
                <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest mb-2">Our Work</h2>
                <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Featured Projects</h1>
            </div>
          </Reveal>
          <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
          <Reveal>
            <p className="font-helevtica font-light text-lg md:text-xl leading-relaxed pt-4 pb-14">
                Explore the hands-on engineering challenges our teams are tackling this year.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsData.map((event, index) => (
              <Reveal key={index} width="100%">
                <ProjectCard 
                  event={event} 
                />
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
      {/* about section */}
     

    </Layout>
  );
}

export default FrontPage;
