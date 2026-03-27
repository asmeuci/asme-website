import Layout from "../components/Layout"
import { Reveal } from "../components/Reveal"
import Section from "../components/Section"
import LinkCard from "../components/LinkCard"
import discordIcon from "@/assets/social/discord.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import linkedinIcon from "@/assets/social/linkedin.svg";

function Links(){
    return(
        <Layout>
            {/* Added pt-32 so the content starts below the absolute Navbar */}
            <div className="min-h-screen bg-[#f1f0ea] pt-14 pb-10 space-y-2 md:space-y-4 md:pt-40">
                
                {/* RSPV Section*/}
                <Section className="bg-[#f1f0ea] pt-0">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">RSVP Forms</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="flex flex-col space-y-5">
                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME FLAM Tour Interest Form" 
                                href="https://forms.gle/bi3zssBsKxJqDqiV6" 
                                description="Flying Leatherneck Aviation Museum (FLAM) has the largest and most complete collection of historical aircraft flown by U.S. Marine pilots in the world. A team of UCI students currently work together to restore the 1917 Curtiss JN-4D, or Jenny plane that trained U.S. Air Service throughout World War I. We will be touring a hangar for the new museum that will be built next year in Irvine. "
                            />
                        </Reveal>

                        <Reveal width="100%">
                            <LinkCard 
                                title="Formula Drift S26 Student RSVP" 
                                href="https://forms.gle/RTMP6P2cmrsJhVADA" 
                                description={`Hi there Anteaters! Forsberg Racing along with their competition car, Papadakis Racing along with their competition car, Odi Bakchis (driver), and Kevin Wells (competition director), will discuss their path into racing / Formula Drift and showcase their cars! Also there will be time at the end for food and open networking with the FD reps!`}
                            />
                        </Reveal>

                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME Bonfire RSVP Form" 
                                href="https://forms.gle/Jttruh5zavgHhbWy7" 
                                description="Join us for a fun evening at the beach! We will have volleyball, pizza, and s'mores :D"
                            />
                        </Reveal>

                    </div>
                </Section>

                {/* General Forms Section*/}
                <Section className="bg-[#f1f0ea]">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Forms</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="flex flex-col space-y-5">
                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME Sticker Form" 
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdWrHJifSjYBj7jXCziuhKL5NIIPEIAT5psxA9_EdBEJT7OfA/viewform" 
                                description="Support ASME by buying our stickers!"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME Newsletter Signup" 
                                href="https://zotspot.uci.edu/ASME/club_signup" 
                                description="Join our newsletter to stay up to date about ASME!"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME Google Calendar" 
                                href="https://calendar.google.com/calendar/u/0?cid=Zmtybm5jYW9hYnFwbHE2cHMwOGIwMXN1ZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" 
                                description="View all upcoming ASME events and important dates."
                            />
                        </Reveal>
                               <Reveal width="100%">
                            <LinkCard 
                                title="Wins of the Week!" 
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdINpl2NY8RXrpXWf0T7AkO83vXS1_Nx7UfzpSPLHWkR6Gosw/viewform" 
                                description="Let us know what you’ve accomplished this week!"
                            />
                        </Reveal>
                    </div>
                </Section>

                {/* Community Section */}
                <Section className="bg-[#f1f0ea]">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Join the Community</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Reveal width="100%">
                            <LinkCard
                                title="Discord Server"
                                href="https://discord.gg/vDNnTcwTt6"
                                description="Chat with members."
                                iconSrc={discordIcon}
                                iconAlt="Discord icon"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard
                                title="Instagram"
                                href="https://www.instagram.com/asmeatuci/"
                                description="@asmeatuci"
                                iconSrc={instagramIcon}
                                iconAlt="Instagram icon"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard
                                title="LinkedIn"
                                href="https://www.linkedin.com/company/asme-uci/"
                                description="Connect with alumni."
                                iconSrc={linkedinIcon}
                                iconAlt="LinkedIn icon"
                            />
                        </Reveal>
                    </div>
                </Section>
            </div>
        </Layout>
    )
}

export default Links
