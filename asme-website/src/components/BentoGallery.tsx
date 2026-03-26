import front1 from "@/assets/frontpage/front.jpg";
import front2 from "@/assets/frontpage/front2.jpg";
import front3 from "@/assets/frontpage/front3.jpg";
import front5 from "@/assets/frontpage/front5.jpg";
import test1 from "@/assets/frontpage/test1.jpg";
import asme from "@/assets/frontpage/asme40.jpg";

function BentoGallery() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 w-full h-auto md:h-[800px]">
        
        {/* img1*/}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-lg min-h-[250px]">
          <img 
            src={front1}
            alt="Main Feature"
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>

        {/* img2*/}
        <div className="md:col-span-2 relative min-h-[200px]">
          <img 
            src={front2}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img3*/}
        <div className="relative min-h-[200px]">
          <img 
            src={asme}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img4 */}
         <div className="relative min-h-[200px]">
          <img 
            src={front5}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img5 object-cover
        
        object-contain
object-cover
object-fill
object-none
object-scale-down
        
        
        */ }
         <div className="relative min-h-[200px]">
          <img 
            src={test1}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img6*/}
        <div className="md:col-span-3 relative min-h-[200px]">
          <img 
            src={front3}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

      </div>
    </div>
  )
}

export default BentoGallery;
