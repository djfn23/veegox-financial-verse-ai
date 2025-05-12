
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-veegox-purple/30 animate-pulse-light" 
          style={{ animationDuration: '4s', animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-veegox-blue/30 animate-pulse-light" 
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-veegox-purple/20 animate-pulse-light" 
          style={{ animationDuration: '8s', animationDelay: '2s' }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-veegox-card-bg rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to start your</span>
                  <span className="block text-gradient">DeFi journey?</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  Join the Veegox ecosystem today and explore the future of finance. Connect your wallet to start investing, lending, and earning.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:gap-4">
                  <Button className="bg-veegox-gradient hover:opacity-90 transition-opacity mb-4 sm:mb-0">
                    Get Started
                  </Button>
                  <Button variant="outline" className="border-gray-500 text-white hover:bg-veegox-purple/10">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative h-64">
                  {/* Stylized image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-veegox-gradient opacity-80 blur-md"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-xl font-bold">VEEGOX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
