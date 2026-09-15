import Layout from "../components/Layout";
import Section from "../components/Section";

function Minimechs() {
    return(
    <Layout>
        <div className="min-h-screen bg-[#f1f0ea]">
            <Section className=" bg-[url(/sponsors/sponsorbgMB.png)] md:bg-[url(/sponsors/sponsorbg.webp)] bg-[length:103%_auto] py-0">
                <div className="container mx-auto md:w-7/8">
                    <div className="relative bg-blue-900 rounded-[20px] flex justify-center md:mt-15 md:rounded-[80px]">
                        <img
                            src= "decorations/bear.png"
                            alt= "decoration"
                            className="absolute w-10 md:w-30 h-auto -bottom-5 md:-bottom-10 -right-3 md:-right-10 rotate-30 transition-transform hover:scale-105">
                        </img>
                        <img
                            src= "decorations/grass.png"
                            alt= "decoration"
                            className="absolute w-20 md:w-55 h-auto -top-10 md:-top-20 -left-5  md:-left-20 -rotate-30 transition-transform hover:scale-105">
                        </img>
                        <h1 className="px-5 py-8 md:px-12 md:py-12 font-scrap text-[40px] md:text-[64px] text-blue-400 text-center">
                            MiniMechs
                        </h1>
                    </div>
                </div>
            </Section>
            <Section className="bg-transparent pt-4 pb-24 md:pb-32">
                <div className="mt-auto border-t-[0.5px] border-zinc-700 pt-4" />
                <div className= "grid grid-cols-1 items-center md:grid-cols-2">
                    <h1 className = "font-helvetica font-bold p-5 text-lg md:text-2xl">
                        MiniMechs is a program where students can pair up with older students in order to gather tips and tricks to thrive in engineering, meet new friends, as well as gather valuable skills for your first year at UCI!
                    </h1>
                    <img
                        src= "MiniMechs/MiniMechs.webp"
                        alt= "Mentees get introduced to their mentors for the school year!"
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                </div>
                <div className="grid mt-5 items-center grid-cols-1 md:grid-cols-3">
                    <img
                        src= "MiniMechs/Excitement.webp"
                        alt= "Mentees get introduced to their mentors for the school year!"
                        className=" w-full h-full object-cover transition-transform rounded-lg">
                    </img>
                    <ul className = "font-helvetica font-bold text-md md:text-xl list-[circle] pl-15 py-10">
                        <li> SolidWorks CSWA Practice</li>
                        <li>Interview Prep</li>
                        <li>Introduction to Portfolios</li>
                        <li>4 Year Plans</li>
                    </ul>
                    <img
                        src= "MiniMechs/SDWPrac.webp"
                        alt= "Mentees get introduced to their mentors for the school year!"
                        className=" w-full h-full mt-5 object-cover transition-transform rounded-lg">
                    </img>
                </div>
                <h1 className = "font-helvetica mt-10 font-bold text-lg md:text-2xl">
                    At the end of the day, we also like to have fun as well. We offer socials throughout the program to offer you a more casual opportunity to get to know your mentors better and make friends with fellow mentees!
                </h1>
            </Section>
        </div>
    </Layout>
    )
}

export default Minimechs;