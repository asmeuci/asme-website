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
                
                {/* RSVP Section*/}
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
                                title="AIAA x ASME Dave and Buster's Power Card and Ride Form"    
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfEprGziv36CpQnhKrsrGPQnBL1qokWTG1EzHhyjoAnPb8Lqg/viewform?pli=1&pli=1" 
                                description="Join AIAA x ASME for a fun night at Dave and Buster's at Irvine Spectrum! Buy a $10 or $20 Power Card and support future events, workshops, and socials! Power Cards purchases
                                are due May 5th, so don't miss out!"
                            />
                        </Reveal>

                    </div>
                </Section>

                {/* Resources Section*/}
                <Section className="bg-[#f1f0ea] pt-0">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Resources</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="flex flex-col space-y-5">

                        <Reveal width="100%">
                            <LinkCard 
                                title="Welcome to UCI!" 
                                href=" https://docs.google.com/document/d/1eshmf91atoLJUE7oEpndED69H0qf6El7RRJexYysXdM/edit?usp=sharing" 
                                description="A complete guide for incoming UCI students with housing tips, class planning resources, and everything you need to transition smoothly into college!"
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
