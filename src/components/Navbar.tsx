
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-md dark:bg-black/80" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent text-white mr-3 shadow-md group-hover:shadow-lg transition-all duration-300">
                <Search className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold gradient-text">TruSight</span>
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/upload">
                <Button className="relative overflow-hidden group btn-effect">
                  <span className="relative z-10">Verify Media</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
