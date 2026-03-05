import Layout from "../components/Layout"
import { Reveal } from "../components/Reveal"
import Section from "../components/Section"
import LinkCard from "../components/LinkCard"

function Links(){
    return(
        <Layout>
            {/* Added pt-32 so the content starts below the absolute Navbar */}
            <div className="pt-32 bg-[#f1f0ea] min-h-screen">
                
                {/* RSPV Section*/}
                <Section className="bg-[#f1f0ea]">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest text-zinc-500">Upcoming Events</h2>
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">RSVP Forms</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="flex flex-col space-y-5">
                        <Reveal width="100%">
                            <LinkCard 
                                title="Research Network Night" 
<<<<<<< HEAD
                                href="/Peterworks" //change back to google in the future
=======
                                href="/Peterworks" 
>>>>>>> 887dcfa3b78bbba30941a3970b8c3b9a29457ce6
                                description="herro"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard 
                                title="Senior Design Showcase" 
                                href="https://google.com" 
                                description="herro"
                            />
                        </Reveal>
                    </div>
                </Section>

                {/* General Forms Section*/}
                <Section className="bg-[#f1f0ea]">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest text-zinc-500">Resources</h2>
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">General Forms</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="flex flex-col space-y-5">
                        <Reveal width="100%">
                            <LinkCard 
                                title="Project Reimbursement" 
                                href="#" 
                                description="herro"
                            />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard 
                                title="Workshop Feedback" 
                                href="#" 
                                description="herro"
                            />
                        </Reveal>
                         <Reveal width="100%">
                            <LinkCard 
                                title="Officer Application" 
                                href="#" 
                                description="herro"
                            />
                        </Reveal>
                    </div>
                </Section>

                {/* Community Section */}
                <Section className="bg-[#f1f0ea]">
                    <Reveal>
                        <div className="flex flex-col space-y-2">
                            <h2 className="font-helevtica text-sm font-bold uppercase tracking-widest text-zinc-500">Socials</h2>
                            <h1 className="font-helevtica font-normal text-4xl md:text-5xl font-bold mb-6">Join the Community</h1>
                        </div>
                    </Reveal>
                    <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700 mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Reveal width="100%">
                            <LinkCard title="Discord Server" href="#" description="Chat with members." />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard title="Instagram" href="#" description="@asmeatuci" />
                        </Reveal>
                        <Reveal width="100%">
                            <LinkCard title="LinkedIn" href="#" description="Connect with alumni." />
                        </Reveal>
                    </div>
                </Section>
            </div>
        </Layout>
    )
}

export default Links