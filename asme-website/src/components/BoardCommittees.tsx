import { useEffect, useState } from "react";
import transparentLinkedin from "@/assets/social/linkedin.svg";
import type { BoardCommitteeWithPhoto } from "@/model/BoardDirectory";

interface BoardCommitteesProps {
  committees: BoardCommitteeWithPhoto[];
  heading?: string;
}

function BoardCommittees({ committees, heading = "Get to know our team" }: BoardCommitteesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [committees]);

  const safeActiveIndex = committees.length === 0 ? -1 : Math.min(activeIndex, committees.length - 1);
  const currentCommittee = safeActiveIndex >= 0 ? committees[safeActiveIndex] : null;
  const currentBoardPhoto = currentCommittee?.photoURL ?? "";

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-4 text-3xl font-normal tracking-tighter md:text-4xl">{heading}</h1>

      {currentBoardPhoto ? (
        <img src={currentBoardPhoto} className="h-auto w-4/5 rounded-lg object-cover" alt={`${currentCommittee?.title} Team`} />
      ) : (
        <div className="flex h-48 w-4/5 items-center justify-center rounded-lg text-gray-500 italic">
          No photo available
        </div>
      )}

      <div className="mt-5 flex w-full max-w-8xl flex-col items-center px-4">
        <div className="mb-12 flex w-full justify-center">
          <div className="flex max-w-5xl flex-wrap justify-center gap-3 px-2">
            {committees.map((committee, index) => (
              <button
                key={committee.title}
                onClick={() => setActiveIndex(index)}
                className={`
                  rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300
                  ${
                    safeActiveIndex === index
                      ? "border-gray-900 bg-gray-800 text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {committee.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentCommittee?.members.map((member, idx) => (
              <div key={`${member.name}-${idx}`} className="flex w-60 flex-col items-center sm:items-start">
                <div className="group relative mb-4 h-60 w-60 overflow-hidden rounded-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover"
                  />

                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <img src={transparentLinkedin} alt="LinkedIn" className="h-12 w-12 object-contain opacity-80" />
                    </div>
                  </a>
                </div>
                <div className="w-full px-1">
                  <h3 className="text-center text-lg font-medium leading-tight sm:text-left">{member.name}</h3>
                  <p className="text-center text-sm text-gray-500 sm:text-left">{member.role}</p>
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
