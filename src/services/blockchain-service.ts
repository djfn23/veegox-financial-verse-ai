import { supabase } from "@/integrations/supabase/client";
import { ethers } from "ethers";
import { TokenBalance, Transaction } from "./crypto-service";
import { BlockchainConfig } from "./blockchain-config";

export interface NFT {
  token_id: string;
  contract_address: string;
  name: string;
  symbol: string;
  metadata: any;
  image_url?: string;
}

/**
 * Service pour interagir avec les blockchains via Moralis
 */
export const BlockchainService = {
  /**
   * Retourne un provider pour le réseau spécifié
   */
  getProvider(network: string = "ethereum"): ethers.providers.Provider {
    const chainConfig = BlockchainConfig[network as keyof typeof BlockchainConfig] || BlockchainConfig.ethereum;
    
    // Création d'un provider avec failover entre les différents RPC URLs
    const provider = new ethers.providers.FallbackProvider(
      chainConfig.rpcUrls.map((url, i) => ({
        provider: new ethers.providers.JsonRpcProvider(url),
        priority: i + 1,
        stallTimeout: 2000
      }))
    );
    
    return provider;
  },

  /**
   * Récupère les transactions d'un wallet
   */
  async getTransactions(walletAddress: string, chain: string = "ethereum"): Promise<Transaction[]> {
    try {
      const { data, error } = await supabase.functions.invoke("blockchain", {
        body: { 
          path: "transactions",
          address: walletAddress,
          chain
        }
      });

      if (error) throw new Error(error.message);
      return data.transactions || [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  },

  /**
   * Récupère les NFTs d'un wallet
   */
  async getNFTs(walletAddress: string, chain: string = "ethereum"): Promise<NFT[]> {
    try {
      const { data, error } = await supabase.functions.invoke("blockchain", {
        body: { 
          path: "nfts",
          address: walletAddress,
          chain
        }
      });

      if (error) throw new Error(error.message);
      return data.nfts || [];
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return [];
    }
  },

  /**
   * Récupère les balances de tokens ERC20 d'un wallet
   */
  async getTokenBalances(walletAddress: string, chain: string = "ethereum"): Promise<TokenBalance[]> {
    try {
      const { data, error } = await supabase.functions.invoke("blockchain", {
        body: { 
          path: "tokenBalances",
          address: walletAddress,
          chain
        }
      });

      if (error) throw new Error(error.message);
      return data.tokens || [];
    } catch (error) {
      console.error("Error fetching token balances:", error);
      return [];
    }
  },

  /**
   * Enregistre un profil utilisateur lors de la première connexion
   */
  async registerUserProfile(walletAddress: string, username?: string, email?: string, avatar_url?: string) {
    try {
      const { data, error } = await supabase.functions.invoke("blockchain", {
        body: { 
          path: "registerProfile",
          walletAddress,
          username,
          email,
          avatar_url
        }
      });

      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error("Error registering user profile:", error);
      throw error;
    }
  },

  /**
   * Génère la signature pour une connexion Web3
   */
  async getWalletSignature(message: string, provider: any): Promise<string> {
    try {
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  },

  /**
   * Convertit le nom du réseau en paramètre Moralis
   */
  getMoralisChainParam(chain: string): string {
    switch (chain.toLowerCase()) {
      case "ethereum":
        return "eth";
      case "polygon":
        return "polygon";
      case "bsc":
        return "bsc";
      case "goerli":
        return "goerli";
      case "sepolia":
        return "sepolia";
      case "mumbai":
        return "mumbai";
      default:
        return "eth";
    }
  }
};
