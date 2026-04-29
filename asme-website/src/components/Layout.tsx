import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

/*
We will use this component as a base for all of our views, 
it has both of the navbars for desktop and mobile + 
a footer already in
*/

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      <MobileNavbar />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* desktop navbar */}
        <div className="absolute top-14 z-50 w-full flex justify-center"> 
          <Navbar />
        </div>          

        {/* page content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* footer component*/}
        <footer className="py-6 bg-white">
          <div className="container mx-auto px-6 lg:px-24 flex flex-col gap-2">
              <div className="mt-auto pt-4 border-t-[0.5px] border-zinc-700"></div>
              <Footer/>
          </div>
        </footer>
        
      </div>
    </div>
  );
};

export default Layout;