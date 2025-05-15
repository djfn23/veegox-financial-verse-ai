
/**
 * Utilitaire pour chiffrer/déchiffrer les clés privées
 * Note: Cette implémentation est un exemple simplifié.
 * Dans une application réelle, vous utiliseriez des méthodes de chiffrement plus robustes.
 */
export const CryptoUtils = {
  /**
   * Chiffre une clé privée avec une clé secrète
   * @param privateKey La clé privée à chiffrer
   * @param secretKey La clé secrète pour le chiffrement
   * @returns La clé privée chiffrée encodée en base64
   */
  encryptPrivateKey(privateKey: string, secretKey: string): string {
    try {
      // Convertir les chaînes en tableaux d'octets
      const privateKeyBytes = new TextEncoder().encode(privateKey);
      const secretKeyBytes = new TextEncoder().encode(secretKey);
      
      // XOR simple (à des fins d'exemple uniquement)
      const encryptedBytes = new Uint8Array(privateKeyBytes.length);
      for (let i = 0; i < privateKeyBytes.length; i++) {
        encryptedBytes[i] = privateKeyBytes[i] ^ secretKeyBytes[i % secretKeyBytes.length];
      }
      
      // Convertir en base64
      return btoa(String.fromCharCode.apply(null, [...encryptedBytes]));
    } catch (error) {
      console.error("Erreur lors du chiffrement:", error);
      throw new Error("Impossible de chiffrer la clé privée");
    }
  },
  
  /**
   * Ajoute un nouveau wallet administrateur dans la base de données
   * @param walletAddress L'adresse du wallet
   * @param encryptedPrivateKey La clé privée chiffrée
   * @param description Description optionnelle du wallet
   * @param dailyLimit Limite quotidienne en tokens/ETH
   */
  async addAdminWallet(walletAddress: string, encryptedPrivateKey: string, description?: string, dailyLimit?: number): Promise<boolean> {
    try {
      const { error } = await fetch('/api/admin/wallets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress,
          encryptedPrivateKey,
          description,
          dailyLimit
        })
      }).then(res => res.json());
      
      return !error;
    } catch (error) {
      console.error("Erreur lors de l'ajout du wallet:", error);
      return false;
    }
  },
  
  /**
   * Valide le format d'une adresse Ethereum
   * @param address Adresse à valider
   */
  isValidEthereumAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },
  
  /**
   * Valide le format d'une clé privée Ethereum
   * @param privateKey Clé privée à valider
   */
  isValidPrivateKey(privateKey: string): boolean {
    // Vérifie si c'est une clé privée hexadécimale de 64 caractères (32 octets)
    // avec ou sans le préfixe '0x'
    return /^(0x)?[a-fA-F0-9]{64}$/.test(privateKey);
  }
};
