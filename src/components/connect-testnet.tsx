
import { Button } from "./ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { useState } from "react";
import { toast } from "sonner";

interface ConnectTestnetProps {
  network: "goerli" | "sepolia" | "mumbai";
}

const ConnectTestnet = ({ network }: ConnectTestnetProps) => {
  const { switchNetwork, isConnected } = useWeb3();
  const [isConnecting, setIsConnecting] = useState(false);

  const networkNames: Record<string, string> = {
    goerli: "Goerli",
    sepolia: "Sepolia",
    mumbai: "Mumbai"
  };

  const networkLabels: Record<string, string> = {
    goerli: "Ethereum Goerli",
    sepolia: "Ethereum Sepolia",
    mumbai: "Polygon Mumbai"
  };

  const handleNetworkSwitch = async () => {
    if (!isConnected) {
      toast.error("Merci de connecter votre wallet avant de changer de réseau");
      return;
    }
    
    setIsConnecting(true);
    try {
      await switchNetwork(network);
      toast.success(`Connecté au réseau de test ${networkNames[network]}`);
    } catch (error) {
      console.error(`Erreur de connexion à ${networkNames[network]}:`, error);
      toast.error(`Impossible de se connecter à ${networkNames[network]}. Vérifiez votre wallet.`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button 
      variant="outline"
      className="border-veegox-purple text-veegox-purple hover:bg-veegox-purple/10"
      onClick={handleNetworkSwitch}
      disabled={isConnecting}
    >
      {isConnecting ? `Connexion à ${networkNames[network]}...` : `${networkLabels[network]}`}
    </Button>
  );
};

export default ConnectTestnet;
