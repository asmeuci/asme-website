import { useState, useEffect } from "react";
import MenuIcon from "@/assets/icons/menu-bars.png";
import Gears from "/gears.png"
import { Link } from "react-router-dom";

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
    } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
    }
    }, [isOpen]);


    return (
        <nav className="md:hidden w-full">
            <div className="px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-md relative z-50">
                <Link to="/" onClick={() => setIsOpen(false)} className="inline-flex items-center">
                    <img src={Gears} className="w-9 h-8" alt="Logo" />
                </Link>
                
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="z-50 relative focus:outline-none"
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        <div className={`transform transition-all duration-300 ${isOpen ? "rotate-90 opacity-100" : "rotate-0 opacity-100"}`}>
                             {isOpen ? (
                                <span className="text-xl font-light text-gray-900">✕</span>
                            ) : (
                                <img src={MenuIcon} alt="menu" className="w-6 h-6" />
                            )}
                        </div>
                    </div>
                </button>
            </div>


            <div 
                className={`
                    fixed inset-0 w-full h-screen bg-white z-40
                    flex flex-col pt-24 px-8
                    overflow-hidden touch-none
                    transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
                `}
            >
                <ul className="font-helevtica font-light flex flex-col gap-6 text-2xl ">
                    <li className={`transform transition-all duration-500 delay-100 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-500 block pb-4">Home</Link>
                    </li>
                    <li className={`transform transition-all duration-500 delay-150 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-500 block pb-4">About</Link>
                    </li>
                    <li className={`transform transition-all duration-500 delay-200 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <Link to="/events" onClick={() => setIsOpen(false)} className="hover:text-gray-500 block pb-4">Events</Link>
                    </li>
                    <li className={`transform transition-all duration-500 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <Link to="/yearbook" onClick={() => setIsOpen(false)} className="hover:text-gray-500 block pb-4">Yearbook</Link>
                    </li>
                    <li className={`transform transition-all duration-500 delay-[350ms] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <Link to="/links" onClick={() => setIsOpen(false)} className="hover:text-gray-500 block pb-4">Links</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MobileNavbar;
