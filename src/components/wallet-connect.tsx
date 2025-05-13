
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { Wallet, LogOut, AlertTriangle } from "lucide-react";

const WalletConnect = () => {
  const { account, connectWallet, disconnectWallet, isConnecting, chainId } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (id: number | null) => {
    if (!id) return "Inconnu";
    
    switch (id) {
      case 1:
        return "Ethereum";
      case 5:
        return "Goerli";
      case 11155111:
        return "Sepolia";
      case 137:
        return "Polygon";
      case 80001:
        return "Mumbai";
      case 42161:
        return "Arbitrum";
      case 10:
        return "Optimism";
      case 56:
        return "BSC";
      default:
        return `Réseau #${id}`;
    }
  };

  if (!account) {
    return (
      <Button 
        onClick={connectWallet} 
        disabled={isConnecting}
        className="bg-veegox-gradient hover:opacity-90 transition-opacity"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connexion..." : "Connecter Wallet"}
      </Button>
    );
  }

  return (
    <div className="flex items-center">
      <div className="mr-4">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">{formatAddress(account)}</span>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-400">{getNetworkName(chainId)}</span>
          </div>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={disconnectWallet}
        className="border-veegox-purple/50 text-veegox-purple hover:bg-veegox-purple/10"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WalletConnect;
