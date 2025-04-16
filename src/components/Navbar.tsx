
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "./ui/button";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">DeepGuard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hidden sm:block text-gray-700 hover:text-primary">Home</Link>
            <Link to="/about" className="hidden sm:block text-gray-700 hover:text-primary">About</Link>
            <Link to="/upload">
              <Button>Verify Media</Button>
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
