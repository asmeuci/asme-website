import bentoMain from "@/assets/home/bento-main.jpg";
import bentoTopRight from "@/assets/home/bento-top-right.jpg";
import bentoBottomWide from "@/assets/home/bento-bottom-wide.jpg";
import bentoMidRight from "@/assets/home/bento-mid-right.jpg";
import bentoMid from "@/assets/home/bento-mid.jpg";
import bentoAccent from "@/assets/home/bento-accent.jpg";

function BentoGallery() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 w-full h-auto md:h-[800px]">
        
        {/* img1*/}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-lg min-h-[250px]">
          <img 
            src={bentoMain}
            alt="Main Feature"
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>

        {/* img2*/}
        <div className="md:col-span-2 relative min-h-[200px]">
          <img 
            src={bentoTopRight}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img3*/}
        <div className="relative min-h-[200px]">
          <img 
            src={bentoAccent}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img4 */}
         <div className="relative min-h-[200px]">
          <img 
            src={bentoMidRight}
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
            src={bentoMid}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

        {/* img6*/}
        <div className="md:col-span-3 relative min-h-[200px]">
          <img 
            src={bentoBottomWide}
            className="w-full h-full object-cover rounded-lg" 
            alt="Gallery Item"
          />
        </div>

      </div>
    </div>
  )
}

export default BentoGallery;
