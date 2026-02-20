import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FrontPage from './FrontPage'; 
import Links from './pages/Links';
import asmegif from '../src/assets/asmegif.gif'
import Board from './pages/Board';
import Events from './pages/Events';


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


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/links" element={<Links />} />
        <Route path="/board" element= {<Board/>} />
        <Route path="/events" element = {<Events/>} />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}