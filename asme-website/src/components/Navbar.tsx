import { Link } from 'react-router-dom';
import { Reveal } from "./Reveal";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,navigationMenuTriggerStyle,} from "./ui/navigation-menu";

function Navbar() {
  return (
    <div className="hidden md:block">
      <Reveal>
        <div className="font-helevtica flex justify-center p-4">
          <NavigationMenu className="bg-white/90 backdrop-blur-sm px-6 py-1 rounded-full border border-gray-100 shadow-sm">
            <NavigationMenuList className="gap-1">
              
              {/* Home Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-100 focus:bg-gray-100 rounded-full transition-colors`}>
                  <Link to="/" className="text-sm font-normal text-gray-800">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* About Link w/ dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 data-[state=open]:bg-gray-100 rounded-full font-normal text-sm text-gray-800 transition-colors">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[180px] gap-1 p-2 bg-white rounded-xl ">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/peterworks" className="block p-2 text-sm hover:bg-gray-100 rounded-md transition-colors text-gray-700">
                          Peterworks
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/board" className="block p-2 text-sm hover:bg-gray-100 rounded-md transition-colors text-gray-700">
                          Board
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dynamic Links (Events, Yearbook, Links) */}
              {["Events", "Yearbook", "Links"].map((label) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink 
                    asChild 
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-100 focus:bg-gray-100 rounded-full transition-colors`}
                  >
                    <Link to={`/${label.toLowerCase()}`} className="text-sm font-normal text-gray-800">
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Reveal>
    </div>
  );
}

export default Navbar;