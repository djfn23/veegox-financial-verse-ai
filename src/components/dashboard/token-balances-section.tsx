
import { Coins } from "lucide-react";
import { TokenBalance } from "@/services/crypto-service";

interface TokenBalancesSectionProps {
  balances: TokenBalance[];
  tokenPrices: Record<string, any>;
  isLoading: boolean;
}

const TokenBalancesSection = ({ balances, tokenPrices, isLoading }: TokenBalancesSectionProps) => {
  // Fonction pour formater les montants
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K`;
    } else {
      return amount.toFixed(2);
    }
  };

  // Fonction pour obtenir le symbole de token court
  const getTokenSymbol = (symbol: string) => {
    return symbol.length > 6 ? `${symbol.substring(0, 6)}...` : symbol;
  };

  // Fonction pour calculer la valeur en USD
  const getUsdValue = (balance: number, symbol: string) => {
    const price = tokenPrices[symbol]?.price || 0;
    return balance * price;
  };

  // Fonction pour obtenir la couleur du logo de token
  const getTokenColor = (symbol: string) => {
    const colors: Record<string, string> = {
      "VEX": "bg-veegox-purple",
      "sVEX": "bg-blue-500",
      "gVEX": "bg-purple-600",
      "ETH": "bg-blue-400",
      "BTC": "bg-yellow-500",
      "MATIC": "bg-purple-400",
      "USDC": "bg-blue-500",
      "USDT": "bg-green-500"
    };
    return colors[symbol] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="bg-veegox-card-bg rounded-lg p-4 space-y-2 animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-1/4 mb-4"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-veegox-dark-bg rounded-lg p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 mr-3"></div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-700 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!balances || balances.length === 0) {
    return (
      <div className="bg-veegox-card-bg rounded-lg p-4">
        <h3 className="font-medium mb-4">Vos Tokens</h3>
        <div className="bg-veegox-dark-bg rounded-lg p-4 text-center">
          <Coins className="h-8 w-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400">Aucun token détecté dans votre portefeuille</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-veegox-card-bg rounded-lg p-4">
      <h3 className="font-medium mb-4">Vos Tokens</h3>
      <div className="space-y-2">
        {balances.map((balance) => (
          <div key={balance.id} className="bg-veegox-dark-bg rounded-lg p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full ${getTokenColor(balance.token_symbol)} mr-3 flex items-center justify-center`}>
                <span className="text-xs font-medium text-white">{balance.token_symbol.substring(0, 1)}</span>
              </div>
              <div>
                <div className="font-medium">{getTokenSymbol(balance.token_symbol)}</div>
                <div className="text-xs text-gray-400">{balance.token_symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div>{formatAmount(balance.balance)} {balance.token_symbol}</div>
              <div className="text-xs text-gray-400">
                ≈ ${formatAmount(getUsdValue(balance.balance, balance.token_symbol))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenBalancesSection;
