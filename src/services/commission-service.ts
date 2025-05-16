
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface CommissionSetting {
  id: string;
  token_symbol: string;
  tx_type: string;
  percentage: number;
  min_amount: number | null;
  max_amount: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommissionReport {
  id: string;
  period_start: string;
  period_end: string;
  token_symbol: string;
  total_commission_amount: number;
  transaction_count: number;
  created_at: string;
}

/**
 * Service pour gérer les paramètres et rapports de commission
 */
export class CommissionService {
  /**
   * Récupère les paramètres de commission
   */
  static async getCommissionSettings(): Promise<CommissionSetting[]> {
    try {
      const { data, error } = await supabase
        .from('commission_settings')
        .select('*')
        .order('token_symbol', { ascending: true })
        .order('tx_type', { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des paramètres de commission:", error);
        return [];
      }

      return data as CommissionSetting[];
    } catch (error) {
      console.error("Exception lors de la récupération des paramètres de commission:", error);
      return [];
    }
  }

  /**
   * Met à jour un paramètre de commission
   */
  static async updateCommissionSetting(settingId: string, updates: Partial<CommissionSetting>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('commission_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', settingId);

      if (error) {
        console.error("Erreur lors de la mise à jour du paramètre de commission:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le paramètre de commission",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Mise à jour réussie",
        description: "Le paramètre de commission a été mis à jour",
      });

      return true;
    } catch (error) {
      console.error("Exception lors de la mise à jour du paramètre de commission:", error);
      toast({
        title: "Erreur système",
        description: error instanceof Error ? error.message : "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    }
  }

  /**
   * Ajoute un nouveau paramètre de commission
   */
  static async addCommissionSetting(setting: Omit<CommissionSetting, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('commission_settings')
        .insert([setting]);

      if (error) {
        console.error("Erreur lors de l'ajout du paramètre de commission:", error);
        toast({
          title: "Erreur",
          description: error.message.includes('duplicate') 
            ? "Ce couple token/type de transaction existe déjà" 
            : "Impossible d'ajouter le paramètre de commission",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Paramètre ajouté",
        description: `Commission configurée pour ${setting.token_symbol} (${setting.tx_type})`,
      });

      return true;
    } catch (error) {
      console.error("Exception lors de l'ajout du paramètre de commission:", error);
      return false;
    }
  }

  /**
   * Récupère les rapports de commission pour une période donnée
   */
  static async getCommissionReports(
    startDate?: string,
    endDate?: string
  ): Promise<CommissionReport[]> {
    try {
      let query = supabase
        .from('commission_reports')
        .select('*')
        .order('period_start', { ascending: false });
      
      if (startDate) {
        query = query.gte('period_start', startDate);
      }
      
      if (endDate) {
        query = query.lte('period_end', endDate);
      }
      
      const { data, error } = await query;

      if (error) {
        console.error("Erreur lors de la récupération des rapports de commission:", error);
        return [];
      }

      return data as CommissionReport[];
    } catch (error) {
      console.error("Exception lors de la récupération des rapports de commission:", error);
      return [];
    }
  }

  /**
   * Calcule le montant de la commission pour une transaction
   * @returns { commissionAmount, commissionPercentage } ou null si aucune commission applicable
   */
  static calculateCommission(
    amount: number,
    tokenSymbol: string,
    txType: string,
    settings?: CommissionSetting[]
  ): { commissionAmount: number; commissionPercentage: number } | null {
    try {
      // Si les paramètres ne sont pas fournis, utiliser des valeurs par défaut
      if (!settings || settings.length === 0) {
        // Valeur par défaut pour les tokens Veegox (0.5%)
        if (tokenSymbol === 'VEX' || tokenSymbol === 'sVEX' || tokenSymbol === 'gVEX') {
          const commissionAmount = amount * 0.005;
          return { commissionAmount, commissionPercentage: 0.5 };
        }
        
        // Valeur par défaut pour les autres tokens (0.1%)
        const commissionAmount = amount * 0.001;
        return { commissionAmount, commissionPercentage: 0.1 };
      }

      // Chercher le paramètre correspondant au token et au type de transaction
      const setting = settings.find(
        s => s.token_symbol === tokenSymbol && 
             s.tx_type === txType && 
             s.is_active
      );

      if (!setting) {
        return null;
      }

      // Calculer le montant de la commission
      let commissionAmount = (amount * setting.percentage) / 100;

      // Appliquer les limites min/max si elles sont définies
      if (setting.min_amount !== null && commissionAmount < setting.min_amount) {
        commissionAmount = setting.min_amount;
      }
      
      if (setting.max_amount !== null && commissionAmount > setting.max_amount) {
        commissionAmount = setting.max_amount;
      }

      return { 
        commissionAmount, 
        commissionPercentage: setting.percentage 
      };
    } catch (error) {
      console.error("Erreur lors du calcul de la commission:", error);
      return null;
    }
  }
}
