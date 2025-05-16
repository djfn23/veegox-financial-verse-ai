import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CommissionService } from "./commission-service";

// Types pour les transactions administratives
export interface AdminTransactionParams {
  walletId: string;
  recipientAddress: string;
  amount: string;
  tokenSymbol: string;
  networkId: number;
  txType?: string;
  metadata?: Record<string, any>;
  applyCommission?: boolean;
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

export interface AdminTransaction {
  id: string;
  walletId: string;
  amount: number;
  tokenSymbol: string;
  txType: string;
  status: string;
  txHash: string | null;
  recipientAddress: string | null;
  networkId: number | null;
  commissionAmount: number | null;
  commissionPercentage: number | null;
  originalAmount: number | null;
  createdAt: string;
  updatedAt: string;
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
      // Déterminer si une commission doit être appliquée (par défaut: oui)
      const applyCommission = params.applyCommission !== false;
      
      // Si on applique une commission, récupérer les paramètres de commission
      let commissionSettings = [];
      let commissionInfo = null;
      
      if (applyCommission) {
        commissionSettings = await CommissionService.getCommissionSettings();
        commissionInfo = CommissionService.calculateCommission(
          parseFloat(params.amount),
          params.tokenSymbol,
          params.txType || 'transfer',
          commissionSettings
        );
      }
      
      // Préparer les données de transaction avec ou sans commission
      let transactionData: any = {
        action: 'send_transaction',
        wallet_id: params.walletId,
        recipient_address: params.recipientAddress,
        amount: params.amount,
        token_symbol: params.tokenSymbol,
        network_id: params.networkId,
        tx_type: params.txType || 'payment',
        metadata: params.metadata || {}
      };
      
      // Ajouter les informations de commission si applicables
      if (commissionInfo) {
        transactionData.commission_amount = commissionInfo.commissionAmount.toString();
        transactionData.commission_percentage = commissionInfo.commissionPercentage;
        transactionData.original_amount = params.amount;
      }

      // Appeler la fonction Edge pour traiter la transaction
      const { data, error } = await supabase.functions.invoke('payment-processor', {
        body: transactionData
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
        description: `Transaction ${data.tx_hash} complétée avec succès${commissionInfo ? ' (commission incluse)' : ''}`,
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

  /**
   * Récupère l'historique des transactions administratives
   */
  static async getTransactionHistory(
    filters?: {
      walletId?: string;
      tokenSymbol?: string;
      txType?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<AdminTransaction[]> {
    try {
      let query = supabase
        .from('admin_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      // Appliquer les filtres si fournis
      if (filters) {
        if (filters.walletId) {
          query = query.eq('wallet_id', filters.walletId);
        }
        if (filters.tokenSymbol) {
          query = query.eq('token_symbol', filters.tokenSymbol);
        }
        if (filters.txType) {
          query = query.eq('tx_type', filters.txType);
        }
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        if (filters.startDate) {
          query = query.gte('created_at', filters.startDate);
        }
        if (filters.endDate) {
          query = query.lte('created_at', filters.endDate);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erreur lors de la récupération de l'historique des transactions:", error);
        return [];
      }

      return data.map((tx: any) => ({
        id: tx.id,
        walletId: tx.wallet_id,
        amount: tx.amount,
        tokenSymbol: tx.token_symbol,
        txType: tx.tx_type,
        status: tx.status,
        txHash: tx.tx_hash,
        recipientAddress: tx.recipient_address,
        networkId: tx.network_id,
        commissionAmount: tx.commission_amount,
        commissionPercentage: tx.commission_percentage,
        originalAmount: tx.original_amount,
        createdAt: tx.created_at,
        updatedAt: tx.updated_at
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des transactions:", error);
      return [];
    }
  }
}
