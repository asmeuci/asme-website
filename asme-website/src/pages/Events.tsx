import Section from "../components/Section"
import Layout from "../components/Layout"
//import asmeimg from '../assets/pngver.png';
import { Reveal } from '../components/Reveal';
//import { InstagramEmbed } from 'react-social-media-embed';

const postData = [
  { id: 1, title: "RNN", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg"},
  { id: 2, title: "Post 2", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg"},
  { id: 3, title: "Post 3", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg"},
  { id: 4, title: "Post 4", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 5, title: "Post 5", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 6, title: "Post 6", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 7, title: "Post 1", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 8, title: "Post 2", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 9, title: "Post 3", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 10, title: "Post 4", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 11, title: "Post 5", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 12, title: "Post 6", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 13, title: "Post 1", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 14, title: "Post 2", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 15, title: "Post 3", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 16, title: "Post 4", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 17, title: "Post 5", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
  { id: 18, title: "Post 6", link: "https://www.instagram.com/p/DUpCESOCtjo/", image: "/InstagramPosts/TakingFlight.jpg" },
];

function Events(){
    return(
        <Layout>
            <Section>
                <div className="p-32 bg-[#f1f0ea]">
                    <h1 className="text-[64px] font-bold flex justify-center text-center font-helvetica">CHECK OUT OUR UPCOMING EVENTS!</h1>
        
                    {/*Posts Section*/}
                </div>
           </Section>
           <Section className="bg-[#f1f0ea]">
                <div className="container mx-auto ">
                    <h1 className="flex justify-center font-helvetica text-[40px] p-20 "> Recent Posts </h1>
                    <div className="grid grid-cols-2 gap-6 bg-[#f1f0ea]"> {/*most recent */}
                        {postData.slice(0,6).map((post, index) => (  //post = dataset postData, while index is the loop variable
                            <Reveal key={index} width="100%">
                            <div className="mx-auto max-w-fit border flex items-center justify-center bg-blue-100">
                                <a
                                    href={post.link}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="">
                                    <img 
                                        src={post.image}
                                        alt={post.title}/>
                                </a>
                            </div>
                            </Reveal>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-8 bg-[#f1f0ea] p-6"> {/* //padding to separate the top from middle and bottom */}
                        {postData.slice(6,12).map((post, index) => (
                            <Reveal key={index} width="100%">
                            <div className="mx-auto max-w-fit border flex items-center justify-center bg-blue-100">
                                <a
                                    href={post.link}
                                    target="_blank" 
                                    rel="noopener noreferrer">
                                    <img 
                                        src={post.image}    
                                        alt={post.title}/>
                                </a>
                            </div>
                            </Reveal>
                        ))}
                    </div>
                    <div className="grid grid-cols-6 gap-6 bg-[#f1f0ea]"> {/* 6x1  */}
                        {postData.slice(12,18).map((post, index) => (
                            <Reveal key={index} width="100%">
                            <div className="aspect-[4/5] border flex items-center justify-center bg-blue-100">
                                <a
                                    href={post.link}
                                    target="_blank" 
                                    rel="noopener noreferrer">
                                    <img 
                                        src={post.image}
                                        alt={post.title}/>
                                </a>
                            </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
                
            </Section>
        </Layout>
    )
}

export default Events;