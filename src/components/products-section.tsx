
import FeatureCard from "./feature-card";
import { Coins, PiggyBank, Database, LineChart } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      title: "Decentralized Lending",
      description: "Access crypto-backed loans with competitive rates and flexible terms, all managed by smart contracts.",
      icon: <Coins className="h-6 w-6 text-veegox-purple" />,
    },
    {
      title: "High-Yield Savings",
      description: "Earn interest on your crypto assets with our stable sVEX token and liquidity provision programs.",
      icon: <PiggyBank className="h-6 w-6 text-veegox-purple" />,
    },
    {
      title: "Token Staking",
      description: "Lock your VEX tokens to earn rewards and gain governance rights within the Veegox ecosystem.",
      icon: <Database className="h-6 w-6 text-veegox-purple" />,
    },
    {
      title: "AI Investing",
      description: "Let our AI algorithms automatically manage your portfolio with strategies tailored to your risk profile.",
      icon: <LineChart className="h-6 w-6 text-veegox-purple" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Explore Our Products</h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Veegox offers a complete suite of financial products designed for the decentralized economy,
            all powered by our multi-token ecosystem and AI-driven protocols.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <FeatureCard
              key={product.title}
              title={product.title}
              description={product.description}
              icon={product.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
