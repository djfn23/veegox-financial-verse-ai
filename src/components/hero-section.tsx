
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-48 lg:pt-40">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-hero-glow opacity-50"></div>
        {/* Animated floating circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-veegox-purple/10 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-veegox-blue/10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-16 h-16 rounded-full bg-veegox-purple/10 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block mb-2">Decentralized Finance</span>
            <span className="block text-gradient">for the Digital Era</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore lending, staking, and automated investing powered by AI and governed by our community.
          </p>
          <div className="mt-8 sm:mt-10 flex justify-center gap-4 flex-col sm:flex-row px-4">
            <Button className="text-white bg-veegox-gradient hover:opacity-90 transition-opacity px-8 py-6 sm:py-2 text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="border-gray-500 text-white hover:bg-veegox-purple/10 px-8 py-6 sm:py-2 text-lg">
              <Link to="/explore" className="flex items-center">
                Explore Veegox <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
