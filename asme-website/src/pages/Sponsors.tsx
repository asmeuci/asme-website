import Layout from "../components/Layout";
import Section from "../components/Section";
import ContactForm from "./DATA/ContactForm";

const companies =[
  {
    name: "MatterHackers", 
    image:"sponsors/MatterHackers.png",
    desc1: "Thank you for supplying us with filament to support our PeterWorks program! We will put the filament to good use for students.",
    desc2: "",
    website: "https://www.matterhackers.com",
  },
  
 
]

function Sponsors() {
  return (
    <Layout>
      <div className = " bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto]">
        <div className="">
          <Section className="bg-transparent py-0">
          <div className="container mx-auto md:w-5/6">
            <div className="bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
              <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
              Sponsors
              </h1>
            </div>
          </div>
          </Section>
        </div>

        {/* Large Screens Info */}

        <div className = "hidden lg:flex">
          <div className="container grid grid-cols-2 gap-4 mx-auto px-4 py-3">
            <div className = "bg-[#f1f0ea] rounded-lg p-5">
              <div className = "relative pt-15">
                <img
                  src= "decorations/doggo.webp"
                  alt= "decoration"
                  className="absolute w-25 h-auto -top-15 -right-15 rotate-30 transition-transform hover:scale-105">
                </img>
                <p className= " font-helvetica text-[20px] p-4">
                    We appreciate any and all sponsorship considerations, and we hope to gather your support to keep growing and continue fostering a positive community at UCI. 
                </p>
                <p className= " font-helvetica text-[20px] p-4">
                    Linked below is the sponsorship packet for additional information and the next steps in how to support us. If you have any questions, do not hesitate to contact us at asme@uci.edu.  
                </p>
              </div>
              {/* Package Link*/}
              <a 
              href="ASME_Sponsorship_Package_26_27.pdf"
              target="_blank"   
              rel="noopener noreferrer"
              className="flex justify-center text-[30px] py-3">
                <h1 className = "inline-block px-10 py-3 bg-blue-300 text-black font-helvetica rounded-lg hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
                  Sponsorship Package
                </h1>
              </a>
              {/* Email Link*/}
              <h1 className="font-helvetica text-center text-lg"> Contact us! </h1>
              <ContactForm/>
            </div>
            <img
                src= "sponsors/BOARD.jpg"
                alt= "ASME BOARD Photo at SDNN, our flagship event"
                className=" w-full h-full object-contain transition-transform rounded-lg">
            </img>
          </div>
        </div>
        {/*Small Screen Info*/}
        <div className = "block lg:hidden">
            <img
                src= "sponsors/BOARD.jpg"
                alt= "ASME BOARD Photo at SDNN, our flagship event"
                className=" w-full h-full object-contain transition-transform rounded-lg md:rounded-[80px]">
            </img>
            <div className = "bg-[#f1f0ea] rounded-lg">
              <div className = "pt-15">
                <p className= " font-helvetica text-[19px] p-4 text-center">
                    We appreciate any and all sponsorship considerations, and we hope to gather your support to keep growing and continue fostering a positive community at UCI. 
                </p>
                <p className= " font-helvetica text-[19px] p-4 text-center">
                    Linked below is the sponsorship packet for additional information and the next steps in how to support us. If you have any questions, do not hesitate to contact us at asme@uci.edu.  
                </p>
              </div>
              {/* Package Link*/}
              <a 
              href="ASME_Sponsorship_Package_26_27.pdf"
              target="_blank"   
              rel="noopener noreferrer"
              className="flex justify-center text-[30px] py-3">
                <h1 className = "inline-block px-10 py-3 bg-blue-300 text-black font-helvetica rounded-lg hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
                  Sponsorship Package
                </h1>
              </a>
              {/* Email Link*/}
                <h1 className="font-helvetica text-center text-lg"> Contact us! </h1>
                <div className="px-3 py-2">
                  <ContactForm/>
                </div>
                
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
      </div>
    </Layout>
  );
}

export default Sponsors;
