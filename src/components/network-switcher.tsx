
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Network } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWeb3 } from "@/context/Web3Context";
import { BlockchainConfig } from "@/services/blockchain-config";

interface NetworkSwitcherProps {
  variant?: "default" | "outline";
  showChainName?: boolean;
}

const NetworkSwitcher = ({ variant = "outline", showChainName = true }: NetworkSwitcherProps) => {
  const { chainId, switchNetwork, isConnected } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  // Obtenir le réseau actuel
  const getCurrentNetwork = () => {
    if (!chainId) return null;
    
    // Recherche du réseau correspondant au chainId
    for (const [network, config] of Object.entries(BlockchainConfig)) {
      if (config.chainId === chainId) {
        return { name: network, label: config.name };
      }
    }
    
    // Réseau personnalisé
    return { name: "custom", label: `Réseau #${chainId}` };
  };
  
  const currentNetwork = getCurrentNetwork();
  
  const handleNetworkChange = async (networkName: string) => {
    setIsLoading(true);
    try {
      await switchNetwork(networkName);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Si non connecté, ne pas afficher le sélecteur
  if (!isConnected) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size="sm" 
          disabled={isLoading}
          className={variant === "outline" ? "border-veegox-purple/50 text-veegox-purple hover:bg-veegox-purple/10" : ""}
        >
          <Network className="mr-2 h-4 w-4" />
          {showChainName && currentNetwork && (
            <span className="mr-1">{currentNetwork.label}</span>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(BlockchainConfig).map(([name, config]) => (
          <DropdownMenuItem
            key={name}
            className="cursor-pointer"
            onClick={() => handleNetworkChange(name)}
          >
            <div className="flex items-center">
              {currentNetwork?.name === name && (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              )}
              <span className={currentNetwork?.name !== name ? "ml-6" : ""}>
                {config.name}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NetworkSwitcher;
