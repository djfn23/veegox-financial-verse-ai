
import { useEffect, useState } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { CryptoService, PortfolioData } from '@/services/crypto-service';
import { UserService } from '@/services/user-service';
import { BlockchainService } from '@/services/blockchain-service';
import { toast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  wallet_address: string;
  username: string;
  score_onchain: number;
  avatar_url?: string;
  email?: string;
}

interface VeegoxData {
  isLoading: boolean;
  tokenPrices: Record<string, any>;
  portfolio: PortfolioData | null;
  transactions: any[];
  nfts: any[];
  userProfile: UserProfile | null;
  refreshData: () => Promise<void>;
}

export const useVeegoxData = (): VeegoxData => {
  const { account, isConnected, chainId } = useWeb3();
  
  const [isLoading, setIsLoading] = useState(false);
  const [tokenPrices, setTokenPrices] = useState<Record<string, any>>({});
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getNetworkName = (id: number | null) => {
    if (!id) return "eth";
    switch (id) {
      case 1: return "eth";
      case 137: return "polygon";
      case 56: return "bsc";
      default: return "eth";
    }
  };

  const refreshData = async () => {
    if (!account || !isConnected) return;
    
    setIsLoading(true);
    
    try {
      // Obtenir le profil utilisateur
      const profile = await UserService.getProfileByWallet(account);
      setUserProfile(profile);
      
      // Obtenir les prix des tokens
      const prices = await CryptoService.getTokenPrices(["VEX", "sVEX", "gVEX", "BTC", "ETH", "MATIC"]);
      setTokenPrices(prices);
      
      // Obtenir les données du portfolio
      const portfolioData = await CryptoService.getUserPortfolio(account);
      setPortfolio(portfolioData);
      
      // Obtenir les transactions
      const network = getNetworkName(chainId);
      const txData = await BlockchainService.getTransactions(account, network);
      setTransactions(txData);
      
      // Obtenir les NFTs
      const nftData = await BlockchainService.getNFTs(account, network);
      setNfts(nftData);
      
      // Mettre à jour le score on-chain
      if (profile) {
        await UserService.updateOnChainScore(account);
      }
      
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Recharger les données lorsque le compte ou le réseau change
  useEffect(() => {
    if (account && isConnected) {
      refreshData();
    } else {
      // Réinitialiser les données si l'utilisateur se déconnecte
      setTokenPrices({});
      setPortfolio(null);
      setTransactions([]);
      setNfts([]);
      setUserProfile(null);
    }
  }, [account, isConnected, chainId]);

  return {
    isLoading,
    tokenPrices,
    portfolio,
    transactions,
    nfts,
    userProfile,
    refreshData
  };
};
