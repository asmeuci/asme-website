import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './FrontPage'; 
import Links from './pages/Links';
import asmegif from '../src/assets/asmegif.gif'
import Board from './pages/Board';
import Events from './pages/Events';
import Peterworks from './pages/Peterworks'


const DefaultPage = () => (
  <div className="h-screen flex flex-col items-center justify-center font-helvetica">
    <img src= {asmegif} className = "w-64 h-64"></img>
    <h1 className="text-4xl font-bold mb-4">Coming Soon!</h1>
    <p className="text-gray-600 mb-8">We're still working on this page ❤️</p>
    <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-full">
      Back to Home
    </Link>
  </div>
);

const LaunchLoader = () => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
    <img src={asmegif} className="h-52 w-52 md:h-64 md:w-64" alt="Loading" />
  </div>
);

export default function App() {
  const [isLaunchLoading, setIsLaunchLoading] = useState(() => document.readyState !== 'complete');

  useEffect(() => {
    let revealTimer = 0;
    const fallbackTimer = window.setTimeout(() => {
      setIsLaunchLoading(false);
    }, 7000);

    const finishLoading = () => {
      revealTimer = window.setTimeout(() => {
        setIsLaunchLoading(false);
      }, 150);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(revealTimer);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  if (isLaunchLoading) {
    return <LaunchLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/links" element={<Links />} />
        <Route path="/board" element= {<Board/>} />
        <Route path="/events" element = {<Events/>} />
        <Route path="/Peterworks" element = {<Peterworks/>} />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
