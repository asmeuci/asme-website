import Layout from "../components/Layout";
import Section from "../components/Section";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const CO2026_1 = [
    {
        name: "Kaydi Nomura",
        image: "/CO2026/cutout/kaydi.png",
        origin:  "32.4%_44.3%",
        hover : "kaydi",
        tray: "0px",
        trax: "-100px",
        scale: "2",
        coords: "1222,831,  1182,847,  1159,918,  1149,988,  1095,1045,  1075,1165,  1122,1172,  1119,1296,  1125,1336,  1092,1667,  1192,1660,  1189,1704,  1162,1730,  1202,1740,  1266,1734,  1296,1710,  1309,1670,  1366,1647,  1303,1286,  1256,1192,  1253,1145,  1299,1058,  1299,995,  1283,894,  1256,844"
    },
    {
        name: "Brian Chau",
        image: "/CO2026/cutout/bchau.png",
        origin: "60.77%_32.3%",
        hover: "bchau",
        tray: "80px",
        trax: "-280px",
        scale: "2",
        coords: "2307,573, 2260,617, 2277,680, 2263,720, 2200,770, 2173,844, 2173,911, 2220,918, 2206,1065, 2210,1138, 2387,1148, 2374,938, 2394,874, 2420,760, 2340,694, 2370,613",
    },
    {
        name: "Brandon Liu",
        image: "/CO2026/cutout/brandon.png",
        origin: "20.46%_42.93%",
        hover: "brandon",
        tray: "0px",
        trax: "-0px",
        scale: "2",
        coords: "707,898,724,847,764,844,784,864,787,934,794,971,838,998,874,1132,885,1178,878,1209,905,1362,841,1490,868,1563,908,1603,791,1620,754,1583,721,1506,774,1480,721,1282,697,1292,677,1269,670,1219, 640,1175, 630,1088, 644,1015, 710,964",
    },
    {
        name: "Kaitlyn Nguyen",
        image: "/CO2026/cutout/kaitlyn.png",
        origin: "61.84%_57.86%",
        hover: "kaitlyn",
        tray: "-30px",
        trax: "-280px",
        scale: "2",
        coords: "2059,1675,2029,1631,2042,1558,2153,1468,2236,1367,2230,1314,2210,1230,2223,1167,2313,1153,2354,1220,2367,1300,2400,1377,2464,1538,2497,1648,2517,1759,2454,1792,2370,1785,2337,1812,2253,1809,2246,1752,2203,1769,2180,1728,2109,1581,2099,1671",
    },
    {
        name: "Nolan Hahn",
        image: "/CO2026/cutout/nolan.png",
        origin: "72.93%_56.99%",
        hover: "nolan",
        tray: "-50px",
        trax: "-600px",
        scale: "1",
        coords: "2651,2354,2691,2354,2718,2310,2611,1872,2594,1808,2564,1801,2534,1771,2534,1631,2551,1437,2581,1223,2678,1126,2648,1052,2628,922,2732,882,2789,908,2819,975,2809,1086,2942,1160,2989,1230,2999,1451,2989,1695,2969,1782,2916,1795,2892,1962,2916,2106,2896,2230,2902,2303,2906,2327,2896,2397,2912,2451,2896,2481,2862,2474,2835,2471,2805,2451,2795,2397,2748,2400,2708,2407,2671,2400,2638,2387",
    },
    {
        name: "Rebecca Hong",
        image: "/CO2026/cutout/rebecca.png",
        origin: "40.45%_69.91%",
        hover: "rebecca",
        tray: "-50px",
        trax: "-120px",
        scale: "1.8",
        coords: "1500,1491,1560,1467,1590,1481,1604,1517,1624,1564,1630,1628,1634,1655,1650,1681,1660,1728,1674,1755,1694,1775,1677,1812,1671,1839,1681,1875,1704,1976,1721,2012,1764,2046,1737,2053,1704,2056,1654,2056,1630,2053,1600,2053,1580,2053,1573,2089,1540,2093,1500,2093,1480,2059,1440,2066,1416,2096,1363,2113,1292,2136,1256,2150,1199,2166,1152,2176,1128,2156,1068,2126,1105,2099,1169,2083,1209,2053,1262,2022,1302,1986,1336,1962,1346,1932,1380,1879,1413,1825,1393,1795,1370,1755,1390,1742,1407,1711,1417,1671,1440,1628,1463,1598,1460,1554,1477,1514",
    },
    {
        name: "Rina Mangalampalli",
        image: "/CO2026/cutout/rina.png",
        origin: "16.99%_66.20%",
        hover: "rina",
        tray: "-60px",
        trax: "0px",
        scale: "2",
        coords: "262,1971,279,1941,319,1931,346,1938,369,1934,373,1911,393,1904,416,1878,449,1854,480,1834,520,1744,520,1700,533,1650,557,1587,580,1563,600,1513,647,1476,680,1480,704,1516,727,1563,747,1590,761,1607,771,1623,777,1643,777,1663,764,1694,734,1757,737,1881,721,1911,690,1928,650,1918,617,1931,587,1941,550,1938,536,1968,496,1978,449,1981,409,1988,286,1988"
    },
    {
        name: "Tyler Tran",
        image: "/CO2026/cutout/tyler.png",
        origin: "87.05%_39.48%",
        hover: "tyler",
        tray: "80px",
        trax: "-730px",
        scale: "1.1",
        coords: "3388,1716,3237,1719,3153,1709,3123,1703,3150,1649,3096,1371,3140,1180,3163,1106,3157,1049,3163,956,3173,842,3193,792,3234,765,3240,735,3220,678,3207,611,3227,561,3287,554,3331,557,3361,594,3331,705,3404,768,3441,795,3461,892,3458,1022,3411,1139,3398,1293,3404,1427",
    },
    {
        name: "Vanessa Shimizu",
        image: "/CO2026/cutout/vanessa.png",
        origin: "45.49%_46.68%",
        hover: "vanessa",
        tray: "0px",
        trax: "-120px",
        scale: "3",
        coords: "1832,1449,1614,1466,1634,1426,1634,1392,1617,1365,1614,1329,1611,1289,1614,1238,1644,1138,1674,1118,1698,1108,1701,1064,1728,1014,1751,1001,1778,1011,1785,1038,1785,1081,1785,1121,1811,1138,1818,1161,1832,1215,1818,1302,1808,1366",
    },
]



function Alumni(){
    const [hoveredPerson, setHoveredPerson] = useState<string | null>(null);
    return(
        <Layout>
           <Section>
                <div>
                    <h1 className="flex justify-center p-20 font-helvetica text-[40px]">
                        ASME Class of 2026    
                    </h1>
                    <div className="relative w-fit mx-auto overflow-visible">
                        <img
                            src="/CO2026/group.jpg" 
                            alt="Asme's Class of 2026 Group Photo"
                            className={` p-4 w-full h-auto block rounded-[80px] transition-all duration-500 ease-out 
                                        ${hoveredPerson ? 'brightness-[0.35] saturate-50' : 'brightness-100 saturate-100'
                                        }`}/>
                        {CO2026_1.map((yes, index) => (  
                            <div
                            key ={index}>
                                <img 
                                    src={yes.image} 
                                    className={`absolute inset-0 w-full h-full p-4 rounded-[80px] pointer-events-none transition-all duration-300 ease-out 
                                        ${hoveredPerson === yes.hover ? 'z-10 drop-shadow-[0_0_25px_#ffffff]' : 'z-0'}`}
                                    
                                    style={{ 
                                        // 1. Anchor point
                                        transformOrigin: yes.origin ? yes.origin.replace('_', ' ') : 'center',
                                        
                                        // 2. Dynamic movement and zoom combo
                                        transform: hoveredPerson === yes.hover 
                                            ? `scale(${yes.scale}) translateY(${yes.tray}) translateX(${yes.trax})` 
                                            : 'scale(1) translateY(0px) translateX(0px)'
                                    }}
                                />
                                <svg
                                    viewBox="0 0 3788 2639" 
                                    className="absolute inset-0 w-full h-full p-4 z-20 pointer-events-none"
                                >
                                    <Link to="/peterworks">
                                        <polygon 
                                            points={yes.coords}
                                            className="fill-transparent cursor-pointer pointer-events-auto"
                                            onMouseEnter={() => setHoveredPerson(yes.hover)}
                                            onMouseLeave={() => setHoveredPerson(null)}
                                        />
                                    </Link>
                                </svg>
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap transition-all duration-500 ease-out z-60 ${
                                    hoveredPerson === yes.hover ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                }`}>
                                    <p className="text-base text-[60px] font-bold tracking-wide text-white font-helvetica">
                                        {yes.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Image 2 */}
                    <img
                        src="/CO2026/group2.jpg" 
                        alt="Asme's Class of 2026 Group Photo"
                        className= "p-4 rounded-[80px]"/>
                </div>
            </Section>
        </Layout>
    );
}

export default Alumni;