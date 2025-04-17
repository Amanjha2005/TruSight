
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t mt-auto bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Search className="h-6 w-6 text-primary mr-2" />
            <span className="font-semibold">TruthLens</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary text-center md:text-left">Home</Link>
            <Link to="/upload" className="text-gray-700 hover:text-primary text-center md:text-left">Verify Media</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary text-center md:text-left">About</Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            © {new Date().getFullYear()} TruthLens. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
