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
                <div className=" p-4 md:p-20 font-helvetica text-white">
                    <Link to="/alumni" className=" absolute block bg-blue-100 font-monkey text-[24px] text-black px-6 py-2 rounded-2xl md:mt-30 ml-[30px] z-[999] cursor-pointer 
                             hover:bg-blue-200 transition-colors duration-200">
                            Back
                     </Link>
                    {/*name plate*/}
                    <div className = "relative p-10 rounded-2xl mt:0 md:mt-20 ">
                        <div className="absolute mt-0 md:mt-0 inset-0 bg-blue-900 rounded-2xl z-0 p-20 mt-20 max-w-3xl mx-auto"></div>
                        <div className="relative z-50 mt-15 md:mt-0 flex justify-center">
                            <h1 className="text-[80px] text-blue-400 font-maple font-bold">{personData.name}</h1> 
                         </div>
                    </div>

                    {/* headshot and frame */}      
                    <div className="flex flex-col items-center w-full mb-12 p-4 md:p-6"> 
                        <div className="relative w-full max-w-lg aspect-square mx-auto">
                            {/* Portrait */}
                            <img 
                                src={personData.head} 
                                loading = "lazy"
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10" 
                            />
                            
                            {/* Frame */}
                            <div className="absolute inset-0 flex justify-center items-start z-20 pointer-events-none">
    
                                <img 
                                    src="/CO2026/decor/photo.webp" 
                                    className="w-[120%] mt-[15%] scale-150 object-contain" 
                                />
                                <h1 className="absolute top-[100%] left-[8%] font-aspire font-bold text-[60px] md:text-[80px] text-black z-30">
                                    Class of 2026
                                </h1>

                            </div>
                        </div>
                    </div>
                    {/* highlight*/}
                    {/* Parent Container: flex layout centered on the screen */}
                    <div className="hidden lg:flex justify-center items-center w-full mt-48 px-4">
                        <div className="w-1/3 flex justify-center">
                            <img 
                                src={personData.spot1} 
                                loading = "lazy"
                                className="w-full h-auto object-contain" 
                            />
                        </div>
                      
                        <div className="w-1/3 flex justify-center">
                            <img 
                                src={personData.spot2} 
                                loading = "lazy"
                                className="w-full h-auto object-contain" 
                            /> 
                        </div>
                    </div>
                    {/* All the fun stuff*/}
                    <div className="hidden lg:flex justify-center items-center w-full mt-48 px-4">
                        <div className="w-1/3 flex justify-center">
                            <img 
                                src={personData.group1} 
                                loading = "lazy"
                                className="w-full h-auto object-contain rounded-2xl rotate-[15deg] px-4" 
                            />
                        </div>
                        <div className="w-1/4" />
                        <div className="w-1/3 flex justify-center">
                            <img 
                                src={personData.group2} 
                                loading = "lazy"
                                className="w-full h-auto object-contain rounded-2xl rotate-[-15deg] px-4" 
                            /> 
                        </div>
                    </div>
                    <div className="mt-20"/>
                    <div className="flex lg:hidden">
                        <img 
                        src={personData.spot1} 
                        className="w-full h-auto object-contain rounded-[80px] px-4 py-25" />
                    </div>
                    <div className="flex lg:hidden">
                        <img 
                        src={personData.spot2} 
                        className="w-full h-auto object-contain rounded-[80px] px-4 py-8" />
                    </div>
                    <div className="flex lg:hidden">
                        <img 
                        src={personData.group1} 
                        className="w-full h-auto object-contain rounded-[80px] px-4 py-8" />
                    </div>
                    <div className="flex lg:hidden">
                        <img 
                        src={personData.group2} 
                        className="w-full h-auto object-contain rounded-[80px] px-4 py-8" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Spotlight;