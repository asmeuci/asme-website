import { useState } from "react";
import transparentLinkedin from "../assets/linkedinTransparent.svg"
import boardCommitte from "@/model/BoardMembers";
import boardGroupPhotos from "@/model/BoardGroupPhotos"

function BoardCommittees() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCommittee = boardCommitte[activeIndex];
  const currentBoardPhoto = boardGroupPhotos[activeIndex]; 

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-normal text-3xl md:text-4xl tracking-tighter mb-4">
        Get to know our team
      </h1>

      {currentBoardPhoto.photoURL ? (
        <img 
          src={currentBoardPhoto.photoURL} 
          className="w-4/5 h-auto object-cover rounded-lg" 
          alt="Exec Team"
        />
      ) : (
        <div className="w-4/5 h-48 flex items-center justify-center  rounded-lg text-gray-500 italic">
          No photo available
        </div>
      )}

      <div className="flex flex-col mt-5 w-full max-w-8xl px-4 items-center"> 
        <div className="w-full flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl px-2">
            {boardCommitte.map((committee, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  px-5 py-2 rounded-full border transition-all duration-300 font-medium text-sm
                  ${
                    activeIndex === index
                      ? "bg-gray-800 text-white border-gray-900 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                {committee.title}
              </button>
            ))}
          </div>
        </div>

        {/* photo grid*/}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-12">
            {currentCommittee.members.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-start w-60 "> 
                <div className="group relative w-60 h-60 overflow-hidden rounded-md mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover" 
                  />

                  {/* linkedin overlay*/}
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <img src={transparentLinkedin} alt="LinkedIn" className="w-12 h-12 object-contain opacity-80" />
                    </div>
                  </a>
                </div>
                <div className="w-full px-1">
                  <h3 className="font-medium text-lg text-center sm:text-left leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-center sm:text-left text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
export default BoardCommittees;