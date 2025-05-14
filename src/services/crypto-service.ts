
import { supabase } from "@/integrations/supabase/client";

export interface TokenPrice {
  price: number;
  change_24h: number;
  market_cap: number;
  volume_24h: number;
  last_updated: string;
}

export interface TokenBalance {
  id: string;
  wallet_address: string;
  token_symbol: string;
  balance: number;
  network_id: number;
  last_updated: string;
}

export interface StakingPosition {
  id: string;
  wallet_address: string;
  token_symbol: string;
  amount: number;
  lock_period: number;
  start_date: string;
  end_date: string;
  rewards_earned: number;
  is_active: boolean;
  network_id: number;
}

export interface LendingPosition {
  id: string;
  wallet_address: string;
  loan_amount: number;
  loan_token: string;
  collateral_token: string;
  collateral_amount: number;
  interest_rate: number;
  start_date: string;
  due_date: string;
  is_active: boolean;
  network_id: number;
  liquidation_threshold: number;
}

export interface AIPortfolio {
  id: string;
  wallet_address: string;
  strategy_id: string;
  total_value: number;
  created_at: string;
  last_rebalanced: string;
  performance_30d: number;
  is_active: boolean;
  assets: Record<string, any>;
  ai_investment_strategies: {
    id: string;
    name: string;
    description: string;
    risk_level: string;
    allocation: Record<string, any>;
    expected_apy: number;
    is_active: boolean;
  };
}

export interface Transaction {
  id: string;
  wallet_address: string;
  tx_hash: string;
  tx_type: string;
  amount: number;
  token_symbol: string;
  network_id: number;
  timestamp: string;
  status: string;
  details: Record<string, any>;
}

export type PortfolioData = {
  balances: TokenBalance[];
  staking: StakingPosition[];
  lending: LendingPosition[];
  ai_portfolio: AIPortfolio | null;
};

/**
 * Service pour récupérer les données crypto
 */
export const CryptoService = {
  /**
   * Récupère les prix des tokens
   */
  async getTokenPrices(tokens: string[] = ["VEX", "BTC", "ETH"], vsCurrency: string = "USD"): Promise<Record<string, TokenPrice>> {
    try {
      const { data, error } = await supabase.functions.invoke("crypto-data", {
        body: { 
          path: "prices",
          tokens: tokens.join(","),
          vs_currency: vsCurrency
        }
      });

      if (error) throw new Error(error.message);
      return data.prices || {};
    } catch (error) {
      console.error("Error fetching token prices:", error);
      return {};
    }
  },

  /**
   * Récupère les données du portfolio d'un utilisateur
   */
  async getUserPortfolio(walletAddress: string): Promise<PortfolioData> {
    try {
      const { data, error } = await supabase.functions.invoke("crypto-data", {
        body: { 
          path: "portfolio",
          wallet: walletAddress
        }
      });

      if (error) throw new Error(error.message);
      
      return {
        balances: data.balances || [],
        staking: data.staking || [],
        lending: data.lending || [],
        ai_portfolio: data.ai_portfolio || null
      };
    } catch (error) {
      console.error("Error fetching user portfolio:", error);
      return {
        balances: [],
        staking: [],
        lending: [],
        ai_portfolio: null
      };
    }
  }
};
