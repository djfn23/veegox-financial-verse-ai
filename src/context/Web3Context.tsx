
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { useToast } from "@/components/ui/use-toast";

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet non détecté",
        description: "Veuillez installer MetaMask ou un autre wallet compatible Web3",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      
      // Demande de connexion au wallet
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethersProvider.send("eth_requestAccounts", []);
      
      const signer = ethersProvider.getSigner();
      const connectedAddress = await signer.getAddress();
      const network = await ethersProvider.getNetwork();
      
      setProvider(ethersProvider);
      setAccount(connectedAddress);
      setChainId(network.chainId);
      
      // Sauvegarde l'état de connexion
      localStorage.setItem("walletConnected", "true");
      
      toast({
        title: "Wallet connecté",
        description: `Connecté à ${connectedAddress.substring(0, 6)}...${connectedAddress.substring(38)}`,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion au wallet:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    localStorage.removeItem("walletConnected");
    toast({
      title: "Wallet déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      toast({
        title: "Compte changé",
        description: `Connecté à ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      });
    }
  };

  const handleChainChanged = (chainIdHex: string) => {
    const newChainId = parseInt(chainIdHex, 16);
    setChainId(newChainId);
    toast({
      title: "Réseau changé",
      description: `Connecté au réseau ${newChainId}`,
    });
    
    // Rafraîchit la page pour s'assurer que tout est actualisé correctement
    window.location.reload();
  };

  // Vérifier si l'utilisateur était déjà connecté auparavant
  useEffect(() => {
    const checkConnection = async () => {
      const wasConnected = localStorage.getItem("walletConnected") === "true";
      if (wasConnected && window.ethereum) {
        await connectWallet();
      }
    };

    checkConnection();
  }, []);

  // Configurer les listeners pour les événements du wallet
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("disconnect", disconnectWallet);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", disconnectWallet);
      };
    }
  }, [account]);

  const value = {
    account,
    chainId,
    provider,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isConnected: !!account,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
