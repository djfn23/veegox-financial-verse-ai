
import TokenCard from "./token-card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TokensSection = () => {
  return (
    <section className="py-16 bg-veegox-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Veegox Tokens</h2>
          <Link 
            to="/tokens" 
            className="flex items-center text-veegox-purple hover:text-veegox-blue transition-colors group"
          >
            View all tokens
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TokenCard
            tokenName="VEX Token"
            tokenSymbol="VEX"
            description="The primary utility token for Veegox ecosystem, used for fees, governance, and staking."
            price="$2.45"
            change="+4.2% (24h)"
            isPositive={true}
            gradient="from-veegox-purple to-veegox-blue"
          />
          
          <TokenCard
            tokenName="Stable VEX"
            tokenSymbol="sVEX"
            description="A stable version of VEX pegged to USDC, designed for savings and decreased volatility."
            price="$1.00"
            change="0.0% (24h)"
            isPositive={true}
            gradient="from-blue-500 to-teal-500"
          />
          
          <TokenCard
            tokenName="Governance VEX"
            tokenSymbol="gVEX"
            description="Governance token obtained through locked staking, grants voting rights in the Veegox DAO."
            price="$3.75"
            change="+2.8% (24h)"
            isPositive={true}
            gradient="from-purple-600 to-pink-500"
          />
        </div>
      </div>
    </section>
  );
};

export default TokensSection;
