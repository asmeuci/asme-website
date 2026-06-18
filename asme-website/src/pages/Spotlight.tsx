import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {CO2026_3} from './DATA/CO2026_3';
import {CO2026_2} from './DATA/CO2026_2';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Spotlight() {
    const all2026 = [...CO2026_2, ...CO2026_3] //appends all the people information into one array.
    const topRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const personData = all2026.find(item => item.hover === id);

    useEffect(() => {
        // 2. Use optional chaining (?.) and the boolean 'true' for instant scroll
        if (topRef.current) {
            topRef.current.scrollIntoView(true);
        }
    }, [id]);

    if (!personData) {
        return (
            <div className="p-20 text-white">
                <h1>Classmate not found!</h1>
                <Link to="/">Back to Gallery</Link>
            </div>
        );
    }
    console.log("Current personData:", personData);
    // 3. Render the exact same design layout for everyone, but swap the data
    return (
        <Layout>

        <div ref={topRef} />


            <div className="bg-[url('/CO2026/park.jpg')] bg-cover bg-center bg-fixed min-h-screen">
                <div className="p-20 font-helvetica text-white">
                    {/*name plate*/}
                    <div className = "relative p-10 rounded-2xl">

                        <Link to="/alumni" className="absolute block bg-blue-100 font-monkey text-[24px] text-black px-6 py-2 rounded-2xl mt-30 ml-[30px] z-[999] cursor-pointer 
                 hover:bg-blue-200 transition-colors duration-200">
                            Back
                        </Link>
                        <div className="absolute inset-0 bg-blue-900 rounded-2xl z-0 mt-20 max-w-3xl mx-auto"></div>
                        <div className="relative z-50 mt-20 flex justify-center">
                            <h1 className="text-[80px] text-blue-400 font-maple font-bold">{personData.name}</h1> 
                         </div>
                    </div>
                    {/* headshot*/}
                    <div className = "relative flex items-center">
                        <img src= "/CO2026/decor/photo.png"
                            className = "absolute inset-0 scale-150 mx-auto z-30"/>
                        <img src= {personData.head} alt={personData.name} 
                            className=" absolute inset-0 w-1/3 rounded-2xl mt-15 mx-auto z-20 scale-90" />
                        <h1 className = "relative mx-auto mt-138 font-aspire font-bold text-[60px] text-black z-50 -translate-x-1/2 left-1/2 ml-[-60px]"> 
                            Class of 2026 </h1>
                        <img src= {personData.spot1} alt={personData.name} 
                            className=" absolute w-1/3 mt-100 rounded-2xl -rotate-20 z-40 scale-90" />
                        <img src= {personData.spot2} alt={personData.name} 
                            className="absolute w-1/3 mt-100 rounded-2xl right-1 rotate-20 z-40 scale-90" />
                    </div>
                    <div className = "mt-10 relative">
                        <img src= {personData.group1} alt={personData.name} className="absolute right-0 mr-[70px] mt-70 w-1/3 rounded-2xl -rotate-15" />
                        <img src= {personData.group2} alt={personData.name} className="absolute w-1/3 mt-70 rounded-2xl rotate-15 mr-[50px]" />
                    </div>
                    <div className = "mt-170">

                    </div>



                </div>
            </div>
        </Layout>
    );
}

export default Spotlight;