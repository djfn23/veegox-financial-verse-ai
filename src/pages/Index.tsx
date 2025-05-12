
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import PortfolioCard from "@/components/portfolio-card";
import TokensSection from "@/components/tokens-section";
import ProductsSection from "@/components/products-section";
import CryptoTicker from "@/components/crypto-ticker";
import CTASection from "@/components/cta-section";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Crypto Ticker */}
        <CryptoTicker />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Welcome to Veegox</h2>
              <p className="text-gray-300 mb-6">
                Veegox is a decentralized financial ecosystem that combines traditional DeFi services with AI-powered investing strategies. 
                Our platform offers a suite of financial products designed for the digital era, all governed by our community through the Veegox DAO.
              </p>
              <p className="text-gray-300">
                With our multi-token architecture, you can participate in various aspects of the ecosystem - from earning yield on your assets to 
                participating in governance decisions that shape the future of the protocol.
              </p>
            </div>
            <div>
              <PortfolioCard />
            </div>
          </div>
        </div>
        
        {/* Product Section */}
        <ProductsSection />
        
        {/* Token Section */}
        <TokensSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
