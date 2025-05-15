
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/use-veegox-data';

export class UserService {
  /**
   * Récupère le profil utilisateur par son adresse de wallet
   */
  static async getProfileByWallet(walletAddress: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        return null;
      }

      // Conversion pour s'assurer que le type est correct
      const profile: UserProfile = {
        id: data.id,
        wallet_address: data.wallet_address,
        username: data.username,
        score_onchain: data.score_onchain,
        avatar_url: data.avatar_url,
        email: data.email,
        preferences: data.preferences as Record<string, any> | null
      };

      return profile;
    } catch (error) {
      console.error("Exception lors de la récupération du profil:", error);
      return null;
    }
  }

  /**
   * Met à jour le score on-chain d'un utilisateur
   */
  static async updateOnChainScore(walletAddress: string): Promise<UserProfile | null> {
    try {
      // Simuler un algorithme de scoring on-chain
      const newScore = Math.floor(Math.random() * 100);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          score_onchain: newScore,
          updated_at: new Date().toISOString() // Correction ici: convertir Date en string ISO
        })
        .eq('wallet_address', walletAddress)
        .select()
        .single();
        
      if (error) {
        console.error("Erreur lors de la mise à jour du score:", error);
        return null;
      }

      // Conversion pour s'assurer que le type est correct
      const profile: UserProfile = {
        id: data.id,
        wallet_address: data.wallet_address,
        username: data.username,
        score_onchain: data.score_onchain,
        avatar_url: data.avatar_url,
        email: data.email,
        preferences: data.preferences as Record<string, any> | null
      };
      
      return profile;
    } catch (error) {
      console.error("Exception lors de la mise à jour du score:", error);
      return null;
    }
  }

  /**
   * Crée un profil utilisateur s'il n'existe pas déjà
   */
  static async createUserProfileIfNotExists(walletAddress: string): Promise<UserProfile | null> {
    try {
      // Vérifier si le profil existe déjà
      const existingProfile = await this.getProfileByWallet(walletAddress);
      if (existingProfile) {
        return existingProfile;
      }
      
      // Créer un nouveau profil
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          { 
            wallet_address: walletAddress,
            username: `User_${walletAddress.substring(2, 8)}`
          }
        ])
        .select()
        .single();
        
      if (error) {
        console.error("Erreur lors de la création du profil:", error);
        return null;
      }
      
      return data as unknown as UserProfile;
    } catch (error) {
      console.error("Exception lors de la création du profil:", error);
      return null;
    }
  }

  /**
   * Ajoute un wallet administrateur dans la base de données
   */
  static async addAdminWallet(walletAddress: string, encryptedPrivateKey: string, description?: string, dailyLimit?: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('admin_wallet')
        .insert([
          {
            wallet_address: walletAddress,
            encrypted_private_key: encryptedPrivateKey,
            description: description || 'Wallet administrateur principal',
            daily_limit: dailyLimit || 1000,
            is_active: true
          }
        ]);
        
      if (error) {
        console.error("Erreur lors de l'ajout du wallet administrateur:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Exception lors de l'ajout du wallet administrateur:", error);
      return false;
    }
  }
}
