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

      {/* How To Support Us */}

      <div className = "bg-[#f1f0ea]">
        <div className="container grid grid-cols-2 gap-4 mx-auto px-4 py-3 bg-[#f1f0ea]">
          <div>
            <p className= " font-helvetica text-[20px]">
                We appreciate any and all sponsorship considerations, and we hope to gather your support to keep growing and continue fostering a positive community at UCI. 
            </p>
            <p className= " font-helvetica text-[20px] py-8">
                Linked below is the sponsorship packet for additional information and the next steps in how to support us. If you have any questions, do not hesitate to contact us at asme@uci.edu.  
            </p>
            {/* Package Link*/}
            <a 
            href="https://drive.google.com/file/d/1a4xoQ22yyD3q1cqGiu5wragDKF0gxziq/view"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex justify-center font-helvetica text-[30px]">
              <h1 className = "inline-block px-10 py-3 bg-blue-300 text-black font-helvetica rounded-lg hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
                Sponsorship Package
              </h1>
            </a>
            {/* Email Link*/}
            <a 
            href="mailto:asme@uci.edu"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex justify-center font-helvetica text-[30px] py-4">
              <h1 className = "inline-block px-10 py-3 bg-blue-300 text-black font-helvetica rounded-lg hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
                Contact Us!
              </h1>
            </a>
          </div>
          <img
              src= "sponsors/happiness.jpg"
              alt= "ASME BOARD Photo at SDNN, our flagship event"
              className=" w-full h-full object-contain transition-transform rounded-lg">
          </img>
        </div>

      </div>

      {/* Sponsorship List */}

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
