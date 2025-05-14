
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CryptoDataOptions {
  tokens?: string[];
  vs_currency?: string;
  source?: string;
}

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Variables d'environnement pour Supabase
  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
  const coinmarketcapApiKey = Deno.env.get("COINMARKETCAP_API_KEY") as string;
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { method, path } = req.url.match(/\/([^/]+)(?:\/([^/]+))?$/)?.groups || {};

    if (req.method === "GET") {
      if (path === "prices") {
        // Récupération des prix depuis CoinMarketCap
        const url = new URL(req.url);
        const tokens = url.searchParams.get("tokens")?.split(",") || ["VEX", "BTC", "ETH"];
        const vsCurrency = url.searchParams.get("vs_currency") || "USD";
        
        const cmcUrl = 
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokens.join(",")}&convert=${vsCurrency}`;
        
        const response = await fetch(cmcUrl, {
          headers: {
            "X-CMC_PRO_API_KEY": coinmarketcapApiKey,
            "Accept": "application/json",
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`API error: ${data.status?.error_message || "Unknown error"}`);
        }
        
        // Transformer les données en un format simplifié
        const prices = Object.entries(data.data).reduce((acc, [symbol, details]) => {
          const quote = details.quote[vsCurrency];
          acc[symbol] = {
            price: quote.price,
            change_24h: quote.percent_change_24h,
            market_cap: quote.market_cap,
            volume_24h: quote.volume_24h,
            last_updated: quote.last_updated
          };
          return acc;
        }, {});
        
        return new Response(JSON.stringify({ prices }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (path === "portfolio") {
        // Récupérer le portfolio de l'utilisateur
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authData.user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const walletAddress = req.url.searchParams.get("wallet");
        
        if (!walletAddress) {
          return new Response(
            JSON.stringify({ error: "Wallet address is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Récupérer les soldes de tokens de l'utilisateur depuis Supabase
        const { data: balances, error: balancesError } = await supabase
          .from("token_balances")
          .select("*")
          .eq("wallet_address", walletAddress);
        
        if (balancesError) {
          return new Response(
            JSON.stringify({ error: balancesError.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Récupérer les positions de staking
        const { data: stakingPositions, error: stakingError } = await supabase
          .from("staking_positions")
          .select("*")
          .eq("wallet_address", walletAddress)
          .eq("is_active", true);
        
        // Récupérer les positions de prêt
        const { data: lendingPositions, error: lendingError } = await supabase
          .from("lending_positions")
          .select("*")
          .eq("wallet_address", walletAddress)
          .eq("is_active", true);
        
        // Récupérer le portfolio IA
        const { data: aiPortfolio, error: aiError } = await supabase
          .from("user_ai_portfolios")
          .select("*, ai_investment_strategies(*)")
          .eq("wallet_address", walletAddress)
          .eq("is_active", true)
          .single();
        
        return new Response(
          JSON.stringify({
            balances: balances || [],
            staking: stakingPositions || [],
            lending: lendingPositions || [],
            ai_portfolio: aiPortfolio || null
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    // Si on arrive ici, l'endpoint demandé n'existe pas
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
