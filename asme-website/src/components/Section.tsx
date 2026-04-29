import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string; 
  id?: string; 
}

const Section = ({ children, className = "bg-[#f1f0ea]", id }: SectionProps) => {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container mx-auto px-6 lg:px-24 flex flex-col text-black">
        {children}
      </div>
    </section>
  );
};

export default Section;