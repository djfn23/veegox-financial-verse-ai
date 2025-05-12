
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-9xl font-extrabold text-gradient">404</h1>
          <p className="mt-4 text-xl text-gray-300">Page not found</p>
          <p className="mt-2 text-base text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Button asChild className="bg-veegox-gradient hover:opacity-90 transition-opacity">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
