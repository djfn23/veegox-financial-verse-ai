
import { CryptoUtils } from '@/utils/crypto-utils';
import { UserService } from './user-service';
import { toast } from '@/hooks/use-toast';

/**
 * Configuration initiale du wallet administrateur
 */
export class AdminSetupService {
  /**
   * Configure le wallet administrateur principal si ce n'est pas déjà fait
   * @param walletAddress Adresse du wallet administrateur
   * @param privateKeyOrSeed Clé privée ou seed phrase (sera chiffrée)
   * @param secretKey Clé secrète pour le chiffrement (par exemple, un mot de passe)
   */
  static async setupAdminWallet(
    walletAddress: string,
    privateKeyOrSeed: string,
    secretKey: string
  ): Promise<boolean> {
    try {
      // Vérifier le format de l'adresse Ethereum
      if (!CryptoUtils.isValidEthereumAddress(walletAddress)) {
        toast({
          title: "Adresse invalide",
          description: "Le format de l'adresse Ethereum n'est pas valide",
          variant: "destructive",
        });
        return false;
      }

      // Vérifier si la clé privée a un format valide
      if (!CryptoUtils.isValidPrivateKey(privateKeyOrSeed)) {
        toast({
          title: "Clé privée invalide",
          description: "Le format de la clé privée n'est pas valide",
          variant: "destructive",
        });
        return false;
      }

      // Chiffrer la clé privée
      const encryptedPrivateKey = CryptoUtils.encryptPrivateKey(privateKeyOrSeed, secretKey);

      // Ajouter le wallet administrateur dans la base de données
      const result = await UserService.addAdminWallet(
        walletAddress,
        encryptedPrivateKey,
        "Wallet administrateur principal Veegox",
        5000 // Limite quotidienne en tokens
      );

      if (result) {
        toast({
          title: "Configuration réussie",
          description: `Le wallet administrateur ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} a été configuré avec succès`,
        });
      }

      return result;
    } catch (error) {
      console.error("Erreur lors de la configuration du wallet administrateur:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la configuration du wallet",
        variant: "destructive",
      });
      return false;
    }
  }

  /**
   * Configure le wallet administrateur avec l'adresse fournie (pour démo uniquement)
   * Dans un environnement de production, ne jamais coder en dur la clé privée
   */
  static async setupDemoAdminWallet(): Promise<boolean> {
    // Adresse fournie par l'utilisateur
    const walletAddress = '0xA019A17E0fBF77e775C244399ca0689f6EDf6387';
    
    // Clé privée fictive pour la démo (NE JAMAIS UTILISER UNE VRAIE CLÉ EN PRODUCTION)
    const demoPrivateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    
    // Clé de chiffrement (devrait être fournie par l'utilisateur dans un cas réel)
    const secretKey = 'veegox_admin_demo_key';

    return this.setupAdminWallet(walletAddress, demoPrivateKey, secretKey);
  }
}
