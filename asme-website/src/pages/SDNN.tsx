import Layout from "../components/Layout";
import Section from "../components/Section";

function SDNN() {
    return(
    <Layout>
        <div className="min-h-screen bg-[#f1f0ea]">
            <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto] py-0">
                <div className="container mx-auto md:w-7/8">
                    <div className="bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                        <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
                            Senior Design Networking Night
                        </h1>
                    </div>
                </div>
            </Section>
            <Section className="bg-transparent pt-4 pb-24 md:pb-32">
                <div className="mt-auto border-t-[0.5px] border-zinc-700 pt-4" />
                <div className= "grid grid-cols-1 items-center md:grid-cols-2">
                    <h1 className = "font-helvetica font-bold p-5 text-lg md:text-2xl">
                        Senior design projects at UCI are invited to present about their project and network with students. Learn more about each project as well as talk to management to see the recruitment process as well as find the team you want to be a part of!
                    </h1>
                    <img
                        src= "Quarterly/SDNN5.webp"
                        alt= "SDNN Group Photo, 2026 was the largest SDNN ever hosted."
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                    
                </div>

                <div className="grid mt-5 items-center grid-cols-1 md:grid-cols-3 bg-gray-300 rounded-xl">
                    <h1 className = "font-helvetica ml-4 font-bold text-lg md:text-2xl">
                        2026 Attendees:
                    </h1>
                    <div>
                        <ul className = "font-helvetica font-bold text-md md:text-xl list-[circle] pl-15 py-10">
                            <li>Anteater Baja Racing</li>
                            <li>Anteater Electric Racing</li>
                            <li>Anteater Formula Racing</li>
                            <li>e-Human Powered Vehicle Competition</li>
                            <li>FLAM@UCI</li>
                            <li>Flapping Wing Micro – Air Vehicle</li>
                            <li>Legacy Robotics</li>
                            <li>UAV Forge</li>
                        </ul>
                    </div>
                    <div>
                        <ul className = "font-helvetica font-bold text-md md:text-xl list-[circle] pl-15 py-10">
                            <li>UCI Aero Design</li>
                            <li>UCI CanSat</li>
                            <li>UCI CubeSat</li>
                            <li>UCI Design/Build/Fly</li>
                            <li>UCI HyperXite</li>
                            <li>UCI Rocket Project – Liquids</li>
                            <li>UCI Rocket Project – Solids</li>
                            <li>UCI Solar Airplane</li>
                            <li>UCI Solar Car</li>
                        </ul>
                    </div>
                </div>
                <div className="grid mt-5 items-center grid-cols-1 md:grid-cols-2">
                    <img
                        src= "Quarterly/SDNN2.webp"
                        alt= "FLAM@UCI Networking with Students"
                        className=" w-full h-full object-cover transition-transform rounded-[40px] p-5">
                    </img>
                    <img
                        src= "Quarterly/SDNN1.webp"
                        alt= "DBF Members showcasing their 2026 Competition Plane"
                        className=" w-full h-full  object-cover transition-transform rounded-[40px] p-5">
                    </img>
                    <img
                        src= "Quarterly/SDNN3.webp"
                        alt= "HPVC@UCI Talks to a student."
                        className=" w-full h-full  object-cover transition-transform rounded-[40px] p-5">
                    </img>
                    <img
                        src= "Quarterly/SDNN4.webp"
                        alt= "Anteater Formula Racing Networks with Students"
                        className=" w-full h-full  object-cover transition-transform rounded-[40px] p-5">
                    </img>
                </div>
            </Section>
        </div>
    </Layout>
    )
}

export default SDNN;