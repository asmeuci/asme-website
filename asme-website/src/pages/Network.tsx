import Layout from "../components/Layout";
import Section from "../components/Section";

function Network() {
    return(
    <Layout>
        <div className="min-h-screen bg-[#f1f0ea]">
            <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto] py-0">
                <div className="container mx-auto md:w-7/8">
                    <div className="bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                        <h1 className="p-5 md:p-20 font-scrap text-[40px] md:text-[80px] text-blue-400 text-center">
                            Network With ASME
                        </h1>
                    </div>
                </div>
            </Section>
            <Section className="bg-transparent pt-4 pb-24 md:pb-32">
                <div className="mt-auto border-t-[0.5px] border-zinc-700 pt-4" />
                <div className= "grid grid-cols-1 items-center md:grid-cols-2">
                    <h1 className = "font-helvetica font-bold p-5 text-lg md:text-2xl">
                        Network With ASME is a banquet style networking event where many company representatives are invited to talk and connect with students to give them insights about college, internship and job searching, as well as their experiences in the workforce! Keep an eye out as we finalize the list of attendees for 2026!
                    </h1>
                    <img
                        src= "Quarterly/Network2.webp"
                        alt= "Attendee Group Photo"
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                </div>
                <div className="grid mt-5 items-center grid-cols-1 md:grid-cols-3">
                    <img
                        src= "Quarterly/Network1.webp"
                        alt= "Former Dean Magnus Egersdedt talks to attendees"
                        className=" w-full h-full mt-5 object-cover transition-transform rounded-lg">
                    </img>
                    <div>
                        <h1 className = "font-helvetica mt-10 ml-4 font-bold text-lg md:text-2xl">
                        2025 Attendees:
                        </h1>
                        <ul className = "font-helvetica font-bold text-md md:text-xl list-[circle] pl-15 py-10">
                            <li>ANSYS</li>
                            <li>Hyundai</li>
                            <li>Johnson &amp; Johnson</li>
                            <li>MKS Inc</li>
                            <li>Northrop Grumman</li>
                            <li>Parker Aerospace</li>
                            <li>Rivian</li>
                        </ul>
                    </div>
                    <img
                        src= "Quarterly/Network3.webp"
                        alt= "Company Representatives talk to students"
                        className=" w-full h-full mt-5 object-cover transition-transform rounded-lg">
                    </img>
                </div>
            </Section>
        </div>
    </Layout>
    )
}

export default Network;