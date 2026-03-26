import React from 'react';

interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  tag?: string;
  iconSrc?: string;
  iconAlt?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, description, href, tag, iconSrc, iconAlt }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 bg-white  border-zinc-400 hover:border-black transition-all duration-300 ease-in-out hover:shadow-lg rounded-xl"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {iconSrc && (
              <img
                src={iconSrc}
                alt={iconAlt ?? `${title} icon`}
                className="h-7 w-7 rounded-sm object-contain"
              />
            )}
            <h3 className="font-helevtica text-xl font-bold text-black group-hover:underline underline-offset-4 decoration-1">
              {title}
            </h3>
          </div>
          
          {/* Animated Arrow Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-zinc-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        {description && (
          <p className="font-helevtica text-zinc-600 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Optional Tag at bottom */}
      {tag && (
        <div className="mt-6">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 rounded-full">
            {tag}
          </span>
        </div>
      )}
    </a>
  );
};

export default LinkCard;
