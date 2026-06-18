import Layout from "../components/Layout";
import Section from "../components/Section";
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import { CO2026_1 } from './DATA/CO2026_1';
import { CO2026_3 } from './DATA/CO2026_3';
import { CO2026_2 } from './DATA/CO2026_2';

function Alumni(){
    const [hoveredPerson, setHoveredPerson] = useState<string | null>(null);
    return(
        <Layout>
           <Section>
                <div>
                    <div className="bg-blue-900 rounded-[80px] mt-15">
                        <h1 className="flex justify-center md:p-20 font-scrap text-[30px] md:text-[60px] text-blue-400 text-center">
                            ASME Class of 2026    
                        </h1>
                    </div>
                    {/* Image 1 */}

                    <div className="relative w-fit mx-auto overflow-visible">
                        <img
                            src="/CO2026/group.webp" 
                            alt="Asme's Class of 2026 Group Photo"
                            className={` p-4 w-full h-auto block rounded-[80px] transition-all duration-500 ease-out 
                                        ${hoveredPerson ? 'brightness-[0.35] saturate-50' : 'brightness-100 saturate-100'
                                        }`}/>
                        {CO2026_3.map((grads, index) => (  
                            <div
                            key ={index}>
                                <img 
                                    src={grads.image} 
                                    className={`absolute inset-0 w-full h-full p-4 rounded-[80px] pointer-events-none transition-all duration-300 ease-out 
                                        ${hoveredPerson === grads.hover ? 'z-10 drop-shadow-[0_0_25px_#ffffff]' : 'z-0'}
                                        ${hoveredPerson !== null && hoveredPerson !== grads.hover ? 'brightness-[0.35]' : 'brightness-100'}`}
                                    
                                    style={{ 
                                        // 1. Anchor point
                                        transformOrigin: grads.origin ? grads.origin.replace('_', ' ') : 'center',
                                        
                                        // 2. Dynamic movement and zoom combo
                                        transform: hoveredPerson === grads.hover 
                                            ? `scale(${grads.scale}) translateY(${grads.offsetY}) translateX(${grads.offsetX})` 
                                            : 'scale(1) translateY(0px) translateX(0px)'
                                    }}
                                />
                                <svg
                                    viewBox="0 0 3788 2639" 
                                    className="absolute inset-0 w-full h-full p-4 z-20 pointer-events-none"
                                >
                                    <Link to={`/alumni/${grads.hover}`}>
                                        <polygon 
                                            points={grads.coords}
                                            className="fill-transparent cursor-pointer pointer-events-auto"
                                            onMouseEnter={() => setHoveredPerson(grads.hover)}
                                            onMouseLeave={() => setHoveredPerson(null) }
                                        />
                                    </Link>
                                </svg>
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap transition-all duration-500 ease-out z-60 ${
                                    hoveredPerson === grads.hover ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                }`}>
                                    <p className="text-base text-[60px] font-bold tracking-wide text-white font-bangers">
                                        {grads.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Image 2 */}

                    <div className="relative w-fit mx-auto overflow-visible">
                        <img
                            src="/CO2026/group2.webp" 
                            alt="Asme's Class of 2026 Group Photo"
                            className={` p-4 w-full h-auto block rounded-[80px] transition-all duration-500 ease-out 
                                        ${hoveredPerson ? 'brightness-[0.35] saturate-50' : 'brightness-100 saturate-100'
                                        }`}/>
                        {CO2026_2.map((grads, index) => (  
                            <div
                            key ={index}>
                                <img 
                                    src={grads.image} 
                                    className={`absolute inset-0 w-full h-full p-4 rounded-[80px] pointer-events-none transition-all duration-300 ease-out 
                                        ${hoveredPerson === grads.hover ? 'z-10 drop-shadow-[0_0_25px_#ffffff]' : 'z-0'}
                                        ${hoveredPerson !== null && hoveredPerson !== grads.hover ? 'brightness-[0.35]' : 'brightness-100'}`}
                                    
                                    style={{ 
                                        // 1. Anchor point
                                        transformOrigin: grads.origin ? grads.origin.replace('_', ' ') : 'center',
                                        
                                        // 2. Dynamic movement and zoom combo
                                        transform: hoveredPerson === grads.hover 
                                            ? `scale(${grads.scale}) translateY(${grads.offsetY}) translateX(${grads.offsetX})` 
                                            : 'scale(1) translateY(0px) translateX(0px)'
                                    }}
                                />
                                <svg
                                    viewBox="0 0 3788 2639" 
                                    className="absolute inset-0 w-full h-full p-4 z-20 pointer-events-none"
                                >
                                    <Link to={`/alumni/${grads.hover}`}>
                                        <polygon 
                                            points={grads.coords}
                                            className="fill-transparent cursor-pointer pointer-events-auto"
                                            onMouseEnter={() => setHoveredPerson(grads.hover)}
                                            onMouseLeave={() => setHoveredPerson(null)}
                                        />
                                    </Link>
                                </svg>
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap transition-all duration-500 ease-out z-60 ${
                                    hoveredPerson === grads.hover ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                }`}>
                                    <p className="text-base text-[60px] font-bold tracking-wide text-white font-bangers">
                                        {grads.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    );
}

export default Alumni;