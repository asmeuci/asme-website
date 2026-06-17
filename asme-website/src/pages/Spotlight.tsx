import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {CO2026_3} from './DATA/CO2026_3';
import {CO2026_2} from './DATA/CO2026_2';
import { Link } from 'react-router-dom';

function Spotlight() {
    const all2026 = [...CO2026_2, ...CO2026_3] //appends all the people information into one array.
    const { id } = useParams();
    const personData = all2026.find(item => item.hover === id);

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
            <div className="bg-[url('/CO2026/park.jpg')] bg-cover bg-center bg-fixed min-h-screen">
                <div className="p-20 font-helvetica text-white">
                    <h1 className="text-[80px] text-black font-helvetica-bold p-30">{personData.name}</h1>
                    
                    {/* You can add custom bio text or project links to your array later */}
                    <img src= {personData.head} alt={personData.name} className="w-1/3 mt-10 rounded-2xl" />
                    <img src= {personData.group1} alt={personData.name} className="w-1/3 mt-10 rounded-2xl" />
                    <img src= {personData.group2} alt={personData.name} className="w-1/3 mt-10 rounded-2xl" />
                    <img src= {personData.spot1} alt={personData.name} className="w-1/3 mt-10 rounded-2xl" />
                    <img src= {personData.spot2} alt={personData.name} className="w-1/3 mt-10 rounded-2xl" />

                </div>
            </div>
        </Layout>
    );
}

export default Spotlight;