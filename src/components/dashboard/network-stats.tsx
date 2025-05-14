
import { useEffect, useState } from "react";
import { CryptoService } from "@/services/crypto-service";

interface NetworkStatsProps {
  isConnected: boolean;
}

const NetworkStats = ({ isConnected }: NetworkStatsProps) => {
  const [prices, setPrices] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await CryptoService.getTokenPrices(["VEX", "ETH", "BTC"]);
        setPrices(data);
      } catch (error) {
        console.error("Error fetching token prices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (!isConnected) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-veegox-dark-bg rounded-lg p-4">
            <div className="h-5 bg-gray-700 rounded w-20 mb-1"></div>
            <div className="h-6 bg-gray-700 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-veegox-dark-bg rounded-lg p-4">
        <div className="text-gray-400 text-sm mb-1">VEX Price</div>
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-2">
            ${prices.VEX?.price?.toFixed(2) || "N/A"}
          </div>
          {prices.VEX?.change_24h && (
            <span className={`text-sm ${prices.VEX.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {prices.VEX.change_24h >= 0 ? '+' : ''}{prices.VEX.change_24h.toFixed(2)}%
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-veegox-dark-bg rounded-lg p-4">
        <div className="text-gray-400 text-sm mb-1">ETH Price</div>
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-2">
            ${prices.ETH?.price?.toFixed(2) || "N/A"}
          </div>
          {prices.ETH?.change_24h && (
            <span className={`text-sm ${prices.ETH.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {prices.ETH.change_24h >= 0 ? '+' : ''}{prices.ETH.change_24h.toFixed(2)}%
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-veegox-dark-bg rounded-lg p-4">
        <div className="text-gray-400 text-sm mb-1">BTC Price</div>
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-2">
            ${prices.BTC?.price?.toFixed(2) || "N/A"}
          </div>
          {prices.BTC?.change_24h && (
            <span className={`text-sm ${prices.BTC.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {prices.BTC.change_24h >= 0 ? '+' : ''}{prices.BTC.change_24h.toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkStats;
