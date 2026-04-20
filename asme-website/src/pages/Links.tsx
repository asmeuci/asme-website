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
                                title="Nuclear Reactor Tour" 
                                href="https://forms.gle/57fRq6iZ4ZsHFsZr8" 
                                description="Join ASME at UCI for an exclusive, behind-the-scenes look at the UCI Nuclear Reactor Facility! This is a rare opportunity to see a functioning Mark I TRIGA reactor and learn about the mechanical engineering and safety systems required to maintain a nuclear research environment."
                            />
                        </Reveal>
                        

                         <Reveal width="100%">
                            <LinkCard 
                                title="ASME x Rocket Project Liquids Lab Tours" 
                                href="https://forms.gle/X8yRGuVJ2Y5SfWUMA" 
                                description="Thank you for your interest in applying for Rocket Project Liquids for the upcoming academic school year! Please fill out this form to RSVP for a lab tour.

Once we have received responses from those interested, we will reach back out to you via email to let you know what timeslot you have been assigned to based on your preferences.

To learn more about our team, visit https://www.rocket.eng.uci.edu/.

If you have additional questions, please contact us at ucirocketprojectteam@gmail.com. 
"
                            />
                        </Reveal>

                        <Reveal width="100%">
                            <LinkCard 
                                title="ASME At UCI Senior Design Networking Night RSVP" 
                                href="https://docs.google.com/forms/d/e/1FAIpQLSeDUsNFNE5d1Ag2XP47nPZSnn4R-v7RZ_-25rZQGoOLGxIaDA/viewform?usp=publish-editor" 
                                description="Hello Anteaters! ASME At UCI is excited to invite you all to our annual Senior Design Networking Night! We ask that you fill this form out by Saturday, 4/21/26 by 11:59 PM. Please review the following details carefully before completing the form:"
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
