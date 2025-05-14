
import { supabase } from "@/integrations/supabase/client";
import { BlockchainService } from "./blockchain-service";

interface UserProfile {
  id: string;
  wallet_address: string;
  username: string;
  email?: string;
  avatar_url?: string;
  score_onchain: number;
  created_at: string;
  updated_at: string;
  preferences: Record<string, any>;
}

/**
 * Service pour gérer les profils utilisateurs
 */
export const UserService = {
  /**
   * Récupère le profil d'un utilisateur par son adresse wallet
   */
  async getProfileByWallet(walletAddress: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("wallet_address", walletAddress.toLowerCase())
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Profil non trouvé, le créer
          return this.createProfile(walletAddress);
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  /**
   * Crée un profil utilisateur s'il n'existe pas
   */
  async createProfile(walletAddress: string): Promise<UserProfile | null> {
    try {
      // Utiliser la fonction blockchain pour créer un profil
      const result = await BlockchainService.registerUserProfile(
        walletAddress,
        `user_${walletAddress.substring(2, 8)}`
      );
      
      return result.profile;
    } catch (error) {
      console.error("Error creating user profile:", error);
      return null;
    }
  },

  /**
   * Met à jour le profil d'un utilisateur
   */
  async updateProfile(
    walletAddress: string,
    updates: Partial<Omit<UserProfile, "id" | "wallet_address" | "created_at">>
  ): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("wallet_address", walletAddress.toLowerCase())
        .select("*")
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return null;
    }
  },

  /**
   * Calcule et met à jour le score on-chain d'un utilisateur
   */
  async updateOnChainScore(walletAddress: string): Promise<number> {
    try {
      // Obtenir les transactions et les soldes pour calculer le score
      const [transactions, balances] = await Promise.all([
        BlockchainService.getTransactions(walletAddress),
        BlockchainService.getTokenBalances(walletAddress)
      ]);

      // Algorithme simple de scoring
      let score = 0;
      
      // +10 points par transaction (max 500)
      score += Math.min(transactions.length * 10, 500);
      
      // +20 points par token détenu (max 200)
      score += Math.min(balances.length * 20, 200);
      
      // +1 point par jour depuis la création du profil
      const { data } = await supabase
        .from("user_profiles")
        .select("created_at")
        .eq("wallet_address", walletAddress.toLowerCase())
        .single();
      
      if (data) {
        const createdAt = new Date(data.created_at);
        const now = new Date();
        const daysActive = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        score += Math.min(daysActive, 300);
      }
      
      // Mettre à jour le score dans la base de données
      await supabase
        .from("user_profiles")
        .update({ score_onchain: score, updated_at: new Date().toISOString() })
        .eq("wallet_address", walletAddress.toLowerCase());
      
      return score;
    } catch (error) {
      console.error("Error updating on-chain score:", error);
      return 0;
    }
  }
};
