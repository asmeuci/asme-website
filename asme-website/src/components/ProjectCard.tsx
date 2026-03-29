import { Link } from "react-router-dom";

interface EventItem {
  title: string;
  date: string;
  description: string;
  image: string; 
  tag: string;
}

interface ProjectCardProps {
  event: EventItem;
}

function ProjectCard({event} : ProjectCardProps) {
  return (
    <Link to="/coming-soon" className="font-helvetica group flex flex-col bg-white rounded-2xl overflow-hidden">
      
      <div className="p-6">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-95"
          />
        </div>
      </div>

      <div className="flex-1 px-8 pb-8 pt-2 flex flex-col">        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {event.title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-black text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-2">
            View Project
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
        </div>

      </div>

    </Link>
  );

}

export default ProjectCard;
