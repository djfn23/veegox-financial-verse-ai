
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface NetworkParams {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

const ConnectTestnet = ({ network }: { network: "goerli" | "sepolia" | "mumbai" }) => {
  const { toast } = useToast();

  const networks: Record<string, NetworkParams> = {
    goerli: {
      chainId: "0x5",
      chainName: "Goerli Testnet",
      nativeCurrency: {
        name: "Goerli ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://goerli.infura.io/v3/"],
      blockExplorerUrls: ["https://goerli.etherscan.io"],
    },
    sepolia: {
      chainId: "0xaa36a7",
      chainName: "Sepolia Testnet",
      nativeCurrency: {
        name: "Sepolia ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
    mumbai: {
      chainId: "0x13881",
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
  };
  
  const addNetwork = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet non détecté",
        description: "Veuillez installer MetaMask ou un autre wallet compatible Web3",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networks[network]],
      });
      
      toast({
        title: "Réseau ajouté",
        description: `${networks[network].chainName} a été ajouté à votre wallet`,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du réseau:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le réseau à votre wallet",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button 
      onClick={addNetwork}
      variant="outline"
      className="border-veegox-purple/50 text-white hover:bg-veegox-purple/10"
    >
      Ajouter {networks[network].chainName}
    </Button>
  );
};

export default ConnectTestnet;
