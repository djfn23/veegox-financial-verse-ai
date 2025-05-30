export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_transactions: {
        Row: {
          amount: number
          commission_amount: number | null
          commission_percentage: number | null
          created_at: string
          id: string
          metadata: Json | null
          network_id: number | null
          original_amount: number | null
          recipient_address: string | null
          status: string
          token_symbol: string
          tx_hash: string | null
          tx_type: string
          updated_at: string
          wallet_id: string
        }
        Insert: {
          amount: number
          commission_amount?: number | null
          commission_percentage?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          network_id?: number | null
          original_amount?: number | null
          recipient_address?: string | null
          status?: string
          token_symbol: string
          tx_hash?: string | null
          tx_type: string
          updated_at?: string
          wallet_id: string
        }
        Update: {
          amount?: number
          commission_amount?: number | null
          commission_percentage?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          network_id?: number | null
          original_amount?: number | null
          recipient_address?: string | null
          status?: string
          token_symbol?: string
          tx_hash?: string | null
          tx_type?: string
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "admin_wallet"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_wallet: {
        Row: {
          created_at: string
          daily_limit: number
          description: string | null
          encrypted_private_key: string
          id: string
          is_active: boolean
          last_used: string | null
          transaction_count: number
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          description?: string | null
          encrypted_private_key: string
          id?: string
          is_active?: boolean
          last_used?: string | null
          transaction_count?: number
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          description?: string | null
          encrypted_private_key?: string
          id?: string
          is_active?: boolean
          last_used?: string | null
          transaction_count?: number
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      ai_investment_strategies: {
        Row: {
          allocation: Json
          created_at: string
          description: string
          expected_apy: number
          id: string
          is_active: boolean
          name: string
          risk_level: string
          updated_at: string
        }
        Insert: {
          allocation?: Json
          created_at?: string
          description: string
          expected_apy: number
          id?: string
          is_active?: boolean
          name: string
          risk_level: string
          updated_at?: string
        }
        Update: {
          allocation?: Json
          created_at?: string
          description?: string
          expected_apy?: number
          id?: string
          is_active?: boolean
          name?: string
          risk_level?: string
          updated_at?: string
        }
        Relationships: []
      }
      blocks: {
        Row: {
          block_number: number
          current_hash: string
          id: string
          previous_hash: string
          timestamp: string | null
          transaction_ids: string[]
        }
        Insert: {
          block_number: number
          current_hash: string
          id?: string
          previous_hash: string
          timestamp?: string | null
          transaction_ids: string[]
        }
        Update: {
          block_number?: number
          current_hash?: string
          id?: string
          previous_hash?: string
          timestamp?: string | null
          transaction_ids?: string[]
        }
        Relationships: []
      }
      commission_reports: {
        Row: {
          created_at: string
          id: string
          period_end: string
          period_start: string
          token_symbol: string
          total_commission_amount: number
          transaction_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          period_end: string
          period_start: string
          token_symbol: string
          total_commission_amount?: number
          transaction_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          period_end?: string
          period_start?: string
          token_symbol?: string
          total_commission_amount?: number
          transaction_count?: number
        }
        Relationships: []
      }
      commission_settings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          max_amount: number | null
          min_amount: number | null
          percentage: number
          token_symbol: string
          tx_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          max_amount?: number | null
          min_amount?: number | null
          percentage?: number
          token_symbol: string
          tx_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          max_amount?: number | null
          min_amount?: number | null
          percentage?: number
          token_symbol?: string
          tx_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      dao_proposals: {
        Row: {
          created_at: string
          creator_address: string
          description: string
          id: string
          ipfs_hash: string | null
          options: Json
          results: Json | null
          status: string
          title: string
          total_votes: number
          voting_end: string
          voting_start: string
        }
        Insert: {
          created_at?: string
          creator_address: string
          description: string
          id?: string
          ipfs_hash?: string | null
          options?: Json
          results?: Json | null
          status?: string
          title: string
          total_votes?: number
          voting_end: string
          voting_start: string
        }
        Update: {
          created_at?: string
          creator_address?: string
          description?: string
          id?: string
          ipfs_hash?: string | null
          options?: Json
          results?: Json | null
          status?: string
          title?: string
          total_votes?: number
          voting_end?: string
          voting_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "dao_proposals_creator_address_fkey"
            columns: ["creator_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      dao_votes: {
        Row: {
          id: string
          proposal_id: string
          tx_hash: string | null
          vote_option: number
          voted_at: string
          voter_address: string
          voting_power: number
        }
        Insert: {
          id?: string
          proposal_id: string
          tx_hash?: string | null
          vote_option: number
          voted_at?: string
          voter_address: string
          voting_power: number
        }
        Update: {
          id?: string
          proposal_id?: string
          tx_hash?: string | null
          vote_option?: number
          voted_at?: string
          voter_address?: string
          voting_power?: number
        }
        Relationships: [
          {
            foreignKeyName: "dao_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "dao_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dao_votes_voter_address_fkey"
            columns: ["voter_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      lending_positions: {
        Row: {
          collateral_amount: number
          collateral_token: string
          due_date: string
          id: string
          interest_rate: number
          is_active: boolean
          liquidation_threshold: number
          loan_amount: number
          loan_token: string
          network_id: number
          start_date: string
          wallet_address: string
        }
        Insert: {
          collateral_amount: number
          collateral_token: string
          due_date: string
          id?: string
          interest_rate: number
          is_active?: boolean
          liquidation_threshold: number
          loan_amount: number
          loan_token: string
          network_id: number
          start_date?: string
          wallet_address: string
        }
        Update: {
          collateral_amount?: number
          collateral_token?: string
          due_date?: string
          id?: string
          interest_rate?: number
          is_active?: boolean
          liquidation_threshold?: number
          loan_amount?: number
          loan_token?: string
          network_id?: number
          start_date?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "lending_positions_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      staking_positions: {
        Row: {
          amount: number
          end_date: string
          id: string
          is_active: boolean
          lock_period: number
          network_id: number
          rewards_earned: number
          start_date: string
          token_symbol: string
          wallet_address: string
        }
        Insert: {
          amount: number
          end_date: string
          id?: string
          is_active?: boolean
          lock_period: number
          network_id: number
          rewards_earned?: number
          start_date?: string
          token_symbol: string
          wallet_address: string
        }
        Update: {
          amount?: number
          end_date?: string
          id?: string
          is_active?: boolean
          lock_period?: number
          network_id?: number
          rewards_earned?: number
          start_date?: string
          token_symbol?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "staking_positions_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      token_balances: {
        Row: {
          balance: number
          id: string
          last_updated: string
          network_id: number
          token_symbol: string
          wallet_address: string
        }
        Insert: {
          balance?: number
          id?: string
          last_updated?: string
          network_id: number
          token_symbol: string
          wallet_address: string
        }
        Update: {
          balance?: number
          id?: string
          last_updated?: string
          network_id?: number
          token_symbol?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_balances_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      tokens: {
        Row: {
          created_at: string | null
          creator_address: string
          id: string
          name: string
          symbol: string
          total_supply: number
        }
        Insert: {
          created_at?: string | null
          creator_address: string
          id?: string
          name: string
          symbol: string
          total_supply: number
        }
        Update: {
          created_at?: string | null
          creator_address?: string
          id?: string
          name?: string
          symbol?: string
          total_supply?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          block_id: string | null
          hash: string
          id: string
          receiver: string
          sender: string
          status: string
          timestamp: string | null
          token_symbol: string
        }
        Insert: {
          amount: number
          block_id?: string | null
          hash: string
          id?: string
          receiver: string
          sender: string
          status?: string
          timestamp?: string | null
          token_symbol: string
        }
        Update: {
          amount?: number
          block_id?: string | null
          hash?: string
          id?: string
          receiver?: string
          sender?: string
          status?: string
          timestamp?: string | null
          token_symbol?: string
        }
        Relationships: []
      }
      user_ai_portfolios: {
        Row: {
          assets: Json | null
          created_at: string
          id: string
          is_active: boolean
          last_rebalanced: string
          performance_30d: number
          strategy_id: string
          total_value: number
          wallet_address: string
        }
        Insert: {
          assets?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_rebalanced?: string
          performance_30d?: number
          strategy_id: string
          total_value?: number
          wallet_address: string
        }
        Update: {
          assets?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_rebalanced?: string
          performance_30d?: number
          strategy_id?: string
          total_value?: number
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ai_portfolios_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "ai_investment_strategies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_ai_portfolios_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          preferences: Json | null
          score_onchain: number | null
          updated_at: string
          username: string | null
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          preferences?: Json | null
          score_onchain?: number | null
          updated_at?: string
          username?: string | null
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          preferences?: Json | null
          score_onchain?: number | null
          updated_at?: string
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          address: string
          balance: number
          created_at: string | null
          id: string
          private_key: string
        }
        Insert: {
          address: string
          balance?: number
          created_at?: string | null
          id?: string
          private_key: string
        }
        Update: {
          address?: string
          balance?: number
          created_at?: string | null
          id?: string
          private_key?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_block: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      log_admin_transaction: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_wallet_id: string
              p_tx_type: string
              p_amount: number
              p_token_symbol: string
              p_recipient_address: string
              p_metadata?: Json
              p_network_id?: number
            }
        Returns: undefined
      }
      update_wallet_balances: {
        Args: { transactions: Json }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
