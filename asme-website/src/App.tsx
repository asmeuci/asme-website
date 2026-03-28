import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './FrontPage'; 
import Links from './pages/Links';
import Board from './pages/Board';
import Events from './pages/Events';
import Yearbook from './pages/Yearbook';
import asmegif from '@/assets/site/loading.gif';
import Peterworks from './pages/Peterworks';

const PREVIEW_MODE_STORAGE_KEY = 'asme-preview-mode';
const isDev = import.meta.env.DEV;

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
  const [isPreviewMode, setIsPreviewMode] = useState(() => {
    if (typeof window === 'undefined') return isDev;
    const stored = window.localStorage.getItem(PREVIEW_MODE_STORAGE_KEY);
    if (stored === null) return isDev;
    return stored === 'true';
  });

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

  useEffect(() => {
    window.localStorage.setItem(PREVIEW_MODE_STORAGE_KEY, String(isPreviewMode));
  }, [isPreviewMode]);

  return (
    <>
      <div className={`transition-opacity duration-700 ease-out ${isLaunchLoading && !isLoaderFading ? 'opacity-0' : 'opacity-100'}`}>
        <BrowserRouter>
          <button
            type="button"
            onClick={() => setIsPreviewMode((current) => !current)}
            className="fixed bottom-4 right-4 z-[1000] rounded-full border border-black/15 bg-white/95 px-4 py-2 font-helvetica text-xs font-semibold uppercase tracking-[0.08em] text-gray-800 shadow-lg backdrop-blur"
          >
            {isPreviewMode ? 'Preview Mode: On' : 'Under Construction: On'}
          </button>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/links" element={<Links />} />
            <Route path="/board" element={isPreviewMode ? <Board /> : <DefaultPage />} />
            <Route path="/events" element={isPreviewMode ? <Events /> : <DefaultPage />} />
            <Route path="/yearbook" element={isPreviewMode ? <Yearbook /> : <DefaultPage />} />
            <Route path="/peterworks" element={isPreviewMode ? <Peterworks /> : <DefaultPage />} />
            <Route path="/coming-soon" element={<DefaultPage />} />
            <Route path="*" element={<DefaultPage />} />
          </Routes>
        </BrowserRouter>
      </div>

      {isLaunchLoading && <LaunchLoader isFading={isLoaderFading} />}
    </>
  );
}
