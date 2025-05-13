
import { useWeb3 } from "@/context/Web3Context";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NetworkAlert = () => {
  const { chainId, isConnected } = useWeb3();
  
  // Liste des réseaux supportés (à adapter selon vos besoins)
  const supportedNetworks = [1, 5, 11155111, 137, 80001, 42161, 10, 56];
  
  if (!isConnected) return null;
  
  const isUnsupportedNetwork = !supportedNetworks.includes(chainId || 0);
  
  if (!isUnsupportedNetwork) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Réseau non supporté</AlertTitle>
      <AlertDescription>
        Veuillez vous connecter à un réseau compatible avec Veegox.
        Les réseaux supportés incluent Ethereum Mainnet, Goerli, Sepolia, Polygon, et d&apos;autres réseaux principaux.
      </AlertDescription>
    </Alert>
  );
};

export default NetworkAlert;
