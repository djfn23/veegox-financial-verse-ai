
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Types pour les transactions administratives
export interface AdminTransactionParams {
  walletId: string;
  recipientAddress: string;
  amount: string;
  tokenSymbol: string;
  networkId: number;
  txType?: string;
  metadata?: Record<string, any>;
}

export interface AdminWalletInfo {
  id: string;
  walletAddress: string;
  isActive: boolean;
  dailyLimit: number;
  transactionCount: number;
  lastUsed: string | null;
  createdAt: string;
}

/**
 * Service pour gérer les transactions administratives automatisées
 */
export class AdminTransactionService {
  /**
   * Envoie une transaction depuis le wallet administrateur
   */
  static async sendTransaction(params: AdminTransactionParams): Promise<{
    success: boolean;
    transactionId?: string;
    txHash?: string;
    error?: string;
  }> {
    try {
      // Appeler la fonction Edge pour traiter la transaction
      const { data, error } = await supabase.functions.invoke('payment-processor', {
        body: {
          action: 'send_transaction',
          wallet_id: params.walletId,
          recipient_address: params.recipientAddress,
          amount: params.amount,
          token_symbol: params.tokenSymbol,
          network_id: params.networkId,
          tx_type: params.txType || 'payment',
          metadata: params.metadata || {}
        }
      });

      if (error) {
        console.error("Erreur lors de l'appel à la fonction payment-processor:", error);
        toast({
          title: "Erreur de transaction",
          description: `La transaction n'a pas pu être effectuée: ${error.message}`,
          variant: "destructive",
        });
        return {
          success: false,
          error: error.message
        };
      }

      if (!data.success) {
        toast({
          title: "Échec de la transaction",
          description: data.error || "Une erreur s'est produite lors du traitement de la transaction",
          variant: "destructive",
        });
        return {
          success: false,
          error: data.error
        };
      }

      toast({
        title: "Transaction réussie",
        description: `Transaction ${data.tx_hash} complétée avec succès`,
      });

      return {
        success: true,
        transactionId: data.transaction_id,
        txHash: data.tx_hash
      };

    } catch (error) {
      console.error("Erreur lors de l'envoi de la transaction:", error);
      toast({
        title: "Erreur système",
        description: error instanceof Error ? error.message : "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue"
      };
    }
  }

  /**
   * Récupère la liste des wallets administrateurs actifs
   */
  static async getActiveWallets(): Promise<AdminWalletInfo[]> {
    try {
      const { data, error } = await supabase.functions.invoke('payment-processor', {
        body: {
          action: 'get_wallet_info'
        }
      });

      if (error || !data.wallets) {
        console.error("Erreur lors de la récupération des wallets:", error);
        return [];
      }

      return data.wallets.map((wallet: any) => ({
        id: wallet.id,
        walletAddress: wallet.wallet_address,
        isActive: wallet.is_active,
        dailyLimit: wallet.daily_limit,
        transactionCount: wallet.transaction_count,
        lastUsed: wallet.last_used,
        createdAt: wallet.created_at
      }));

    } catch (error) {
      console.error("Erreur lors de la récupération des wallets administrateurs:", error);
      return [];
    }
  }
}
