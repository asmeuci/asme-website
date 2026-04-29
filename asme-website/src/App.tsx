import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './FrontPage'; 
import Links from './pages/Links';
import asmegif from '@/assets/site/loading.gif';
import Board from './pages/Board';
import Peterworks from './pages/Peterworks';
import Events from './pages/Events';
import Yearbook from './pages/Yearbook';
import YearbookSection from './pages/YearbookSection';

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

const LaunchLoader = ({ isFading }: { isFading: boolean }) => (
  <div
    className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${
      isFading ? 'opacity-0' : 'opacity-100'
    }`}
  >
    <img src={asmegif} className="h-52 w-52 md:h-64 md:w-64" alt="Loading" />
  </div>
);

export default function App() {
  const [isLaunchLoading, setIsLaunchLoading] = useState(true);
  const [isLoaderFading, setIsLoaderFading] = useState(false);

  useEffect(() => {
    let revealTimer = 0;
    let hideLoaderTimer = 0;
    let minDelayTimer = 0;
    let fallbackTimer = 0;
    let revealStarted = false;
    let minDelayDone = false;
    let pageReady = false;
    let gifReady = false;

    const beginReveal = () => {
      if (revealStarted) return;
      revealStarted = true;
      setIsLoaderFading(true);
      hideLoaderTimer = window.setTimeout(() => {
        setIsLaunchLoading(false);
      }, 700);
    };

    const tryReveal = () => {
      if (minDelayDone && pageReady && gifReady) {
        beginReveal();
      }
    };

    minDelayTimer = window.setTimeout(() => {
      minDelayDone = true;
      tryReveal();
    }, 700);

    fallbackTimer = window.setTimeout(() => {
      beginReveal();
    }, 9000);

    const finishLoading = () => {
      pageReady = true;
      revealTimer = window.setTimeout(tryReveal, 50);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    const gifImage = new Image();
    gifImage.src = asmegif;
    if (gifImage.complete) {
      gifReady = true;
      tryReveal();
    } else {
      gifImage.onload = () => {
        gifReady = true;
        tryReveal();
      };
      gifImage.onerror = () => {
        gifReady = true;
        tryReveal();
      };
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(minDelayTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideLoaderTimer);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  return (
    <>
      <div className={`transition-opacity duration-700 ease-out ${isLaunchLoading && !isLoaderFading ? 'opacity-0' : 'opacity-100'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/links" element={<Links />} />
            <Route path="/board" element={<Board/> } />
            <Route path="/events" element={<Events />} />
            <Route path="/yearbook" element={<Yearbook />} />
            <Route path="/yearbook/:section" element={<YearbookSection />} />
            <Route path="/peterworks" element={<Peterworks />} />
            <Route path="/coming-soon" element={<DefaultPage />} />
            <Route path="*" element={<DefaultPage />} />
          </Routes>
        </BrowserRouter>
      </div>

      {isLaunchLoading && <LaunchLoader isFading={isLoaderFading} />}
    </>
  );
}
