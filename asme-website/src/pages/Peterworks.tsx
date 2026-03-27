import Section from "../components/Section"
import Layout from "../components/Layout"

function Peterworks(){
    return(
        <Layout>
            <Section className="bg-[#f1f0ea]">
                <div className="container mx-auto">
                    <h1 className="flex justify-center font-helvetica text-[80px] p-20 "> Peterworks </h1>
                </div>
            </Section>
            {/* Information Section */}
            <Section className="bg-[#f1f0ea]">
                <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
                <div> 
                    <h1 className="font-helvetica text-[15px] p-2"> WHAT IS PETERWORKS?</h1>
                    <h1 className="font-helvetica text-[40px] p-2"> BUILD YOUR OWN DRONE! </h1>
                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex">
                                <img src="/gears.png" alt="temp checkmark" className="w-18 h-18 p-4 "/>
                                <h1 className="font-helvetica text-[30px] py-4"> THE BEST CLASS THAT ISN'T A CLASS </h1>
                            </div>                    
                            <div className="flex items-start gap-4">
                                <h1 className="font-helvetica text-[20px] px-18"> Make new friends and have fun learning and using engineering concepts to have a lot of fun with this project! PeterWorks provides the technical knowledge you get from your classes without the stress of grades or exams; all without any fees! </h1>
                            </div>
                            <div className="flex">
                                <img src="/gears.png" alt="temp checkmark" className="w-18 h-18 p-4 "/>
                                <h1 className="font-helvetica text-[30px] py-4  "> HANDS ON EXPERIENCE </h1>
                            </div> 
                            <div className="flex items-start gap-4">
                                <h1 className="font-helvetica text-[20px] px-18"> This program will let you experience what a long term project is like and give you fabrication opportunities. Learn SolidWorks from the ground up, 3D Printing, laser cutting, and more!</h1>
                            </div> 
                            <div className="flex ">   
                                <img src="/gears.png" alt="temp checkmark" className="w-18 h-18 p-4 "/>
                                <h1 className="font-helvetica text-[30px] py-4"> Making a flying object! </h1>
                            </div>  
                            <div className="flex items-start gap-4">
                                <h1 className="font-helvetica text-[20px] px-18"> Who doesn't want to build a cool drone that can actually fly! </h1>     
                            </div>
                        </div>
                        <div className = "aspectRatio w-full">
                            <iframe className="w-full h-full" src="https://www.youtube.com/embed/OiqO-Q6URTA?si=MGsnomD-Pi9cKGBI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}
export default Peterworks;