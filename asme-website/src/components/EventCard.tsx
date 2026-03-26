import { Link } from "react-router-dom";

interface EventItem {
  title: string;
  date: string;
  description: string;
  image: string; 
  tag: string;
}

interface EventCardProps {
  event: EventItem;
  isReversed: boolean;
}

function EventCard({event, isReversed} : EventCardProps){
  return (
    <Link
      to="/coming-soon"
      className={`font-helvetica group block flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300`}
    >
      
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">        
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-100 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {event.tag}
          </span>
          <span className="text-black text-sm font-medium">
            {event.date}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {event.description}
        </p>

        <span className="self-start text-black font-semibold hover:text-blue-600 transition-colors flex items-center gap-2">
          Learn More
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </span>
      </div>

      <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      </div>

    </Link>
  );
}

export default EventCard;
