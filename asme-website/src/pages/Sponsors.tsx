import Layout from "../components/Layout";
import Section from "../components/Section";

const companies =[
  {
    name: "Ansys",
    image: "sponsors/ansys.png",
    desc1: "Ansys is a software company that focuses on simulation, allowing engineers to stress test their designs without having to manufacture, saving a lot of time and money.",
    desc2: "Thank you for the opportunity to give us the bronze level! We are extremely grateful for your generous funding, and will use the funds to host events broadening engineering access to all students.",
    website: "https://www.ansys.com",
  },
]

function Sponsors() {
  return (
    <Layout>
      <div className="bg-[#f1f0ea] pt-16 md:pt-24">
        <Section className="bg-transparent py-0">
          <div className="container mx-auto">
            <h1 className="p-10 text-center font-helvetica text-4xl md:text-6xl lg:text-7xl">
              Sponsors
            </h1>
          </div>
        </Section>
      </div>
      <div className = "bg-[#f1f0ea]">
        <div className="container mx-auto px-4 bg-[#f1f0ea]">
          <div className="mt-auto border-t-[0.5px] border-zinc-700 bg-[#f1f0ea]" />
        </div>
      </div>
      <div className="bg-[#f1f0ea]">
        <div className="container mx-auto flex flex-wrap justify-center gap-12 px-4 py-10">
          {companies.map((company, index) => (
            <a 
              key={index} 
              href= {company.website}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center group w-full sm:w-[500px]"
            >
              {/* The Image */}
              <img 
                src={company.image} 
                alt={company.name} 
                className="w-full h-48 object-contain transition-transform group-hover:scale-105"
              />
              {/* The Description Under the Image */}
              <p className="mt-4 mb-4 font-helvetica text-center text-black text-[20px] italic">
                {company.desc1}
              </p>
              <p className="mt-4 mb-4 font-helvetica text-center text-black text-[20px] italic">
                {company.desc2}
              </p>
            </a>
          ))}
        </div>
      </div>

    </Layout>
  );
}

export default Sponsors;
