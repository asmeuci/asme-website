import Section from "../components/Section"
import Layout from "../components/Layout"
import { Reveal } from '../components/Reveal';

function Peterworks(){
    return(
        <Layout>
            <Section className="bg-[#f1f0ea]">
                <div className="container mx-auto">
                    <h1 className="flex justify-center font-helvetica text-[80px] p-20 "> Peterworks </h1>
                </div>
            </Section>
            <Section className="bg-[#f1f0ea]">
                <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
                <div>
                    <h1 className="font-helvetica text-[25px]"> What is Peterworks?</h1>
                    <h1 className="font-helvetica text-[40px]"> BUILD YOUR OWN DRONE! </h1>
                    <h1 className="font-helvetica text-[30px]"> THE BEST CLASS THAT ISN'T A CLASS </h1>
                </div>
            </Section>
        </Layout>
    )
}
export default Peterworks;