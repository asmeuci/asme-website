import Layout from "../components/Layout";
import Section from "../components/Section";

function RNN() {
    return(
    <Layout>
        <div className="min-h-screen bg-[#f1f0ea]">
            <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto] py-0">
                <div className="container mx-auto md:w-7/8">
                    <div className="bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                        <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
                            Research Networking Night
                        </h1>
                    </div>
                </div>
            </Section>
            <Section className="bg-transparent pt-4 pb-24 md:pb-32">
                <div className="mt-auto border-t-[0.5px] border-zinc-700 pt-4" />
                <div className= "grid grid-cols-1 items-center md:grid-cols-2">
                    <h1 className = "font-helvetica font-bold p-5 text-lg md:text-2xl">
                        Learn about research labs at UCI and what research is conducted. Connect with professors and graduate students to get the inside scoop of their work (and possibly help get into research)! 
                    </h1>
                    <img
                        src= "Quarterly/RNN2.webp"
                        alt= "Attendee Group Photo"
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                </div>
                
                <div className="grid mt-5 items-center grid-cols-1 md:grid-cols-3">
                    <img
                        src= "Quarterly/RNN1.webp"
                        alt= "Students Networking with Professors and Grad Students"
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                    <div>
                        <h1 className = "font-helvetica mt-10 ml-4 font-bold text-lg md:text-2xl">
                        2026 Attendees:
                        </h1>
                        <ul className = "font-helvetica font-bold text-md md:text-xl list-[circle] pl-15 py-10">
                            <li>Professor Bostanabad</li>
                            <li>Professor Buswell</li>
                            <li>Professor Christoff-Tempesta</li>
                            <li>Professor Huynh</li>
                            <li>Professor Keyak</li>
                            <li>Professor Kisalius</li>
                            <li>Professor Valdevit</li>
                            <li>Goran S. Matijasevic</li>
                        </ul>
                    </div>
                    <img
                        src= "Quarterly/RNN3.webp"
                        alt= "Professor Valdevit and Goran Matijasevic converse with attendees"
                        className=" w-full h-full mt-5 object-cover transition-transform rounded-lg">
                    </img>
                </div>

            </Section>
        </div>
    </Layout>
    )
}

export default RNN;