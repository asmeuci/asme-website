import Layout from "@/components/Layout";

const EventCard = ({ number, title , isLast = false, bgColor = "bg-[#ffe430]", flexClass = "w-full md:flex-1" } : {number : string, title : string, isLast? : boolean, bgColor : string, flexClass? : string}) => {
  return (
    <div className={`flex flex-col ${flexClass}`}>
      <div className="flex justify-start">
        {/* tab part*/}
        <div className={`h-12 w-[90%] md:w-[500px] ${bgColor} rounded-tl-2xl [clip-path:polygon(0_0,90%_0,100%_100%,0_100%)] flex items-end px-4 pb-2`}>
          <span className="text-[14px] font-mono mr-2 mb-1">{number}</span>
        </div>
      </div>

      {/* rectangle */}
      <div className={`h-26 ${bgColor} px-3 pt-2 pb-6`}>
        <span className="text-3xl font-mono lowercase leading-none block">
          {title}
        </span>
      </div>
    </div>
  );
};

function Yearbook() {
  return (
    <Layout>
      <div className="fixed bottom-0 left-0 w-full flex flex-col">
        
        <div className="flex flex-col md:flex-row items-start md:items-end relative z-10 w-full">
          <EventCard number="01" title="jpl tour" bgColor="bg-[#ffe430]" />
          <EventCard number="02" title="research networking night" bgColor="bg-[#e5e7eb]" isLast flexClass="w-full md:flex-1 -mt-12 md:mt-0" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end drop-shadow-sm relative z-20 -mt-12 w-full">
          <EventCard number="03" title="board retreat" bgColor="bg-[#e5e7eb]" flexClass="w-full md:w-[38%]" />
          <EventCard number="04" title="network w/ asme" bgColor="bg-[#9ca3af]" isLast flexClass="w-full md:flex-1 -mt-12 md:mt-0" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end drop-shadow-sm relative z-30 -mt-12 w-full">
          <EventCard number="05" title="asme x matsci" bgColor="bg-[#ffe430]" />
          <EventCard number="06" title="slw 25" bgColor="bg-[#e5e7eb]" isLast flexClass="w-full md:flex-1 -mt-12 md:mt-0" />
        </div>

      </div>
    </Layout>
  );
}

export default Yearbook;