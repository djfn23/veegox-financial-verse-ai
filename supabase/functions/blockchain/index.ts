
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Variables d'environnement pour Supabase et Moralis
  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
  const moralisApiKey = Deno.env.get("MORALIS_API_KEY") as string;
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();
    
    if (req.method === "GET") {
      if (path === "transactions") {
        // Récupérer les transactions d'un wallet sur une blockchain spécifique
        const walletAddress = url.searchParams.get("address");
        const chain = url.searchParams.get("chain") || "eth";
        
        if (!walletAddress) {
          return new Response(
            JSON.stringify({ error: "Wallet address is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Appel à l'API Moralis
        const moralisChain = chain === "eth" ? "0x1" : chain === "polygon" ? "0x89" : chain;
        const moralisUrl = `https://deep-index.moralis.io/api/v2/${walletAddress}/transactions?chain=${moralisChain}`;
        
        const response = await fetch(moralisUrl, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`API error: ${data.message || "Unknown error"}`);
        }
        
        // Enregistrer les nouvelles transactions dans Supabase
        if (data.result && data.result.length > 0) {
          // Récupérer les transactions déjà enregistrées
          const { data: existingTxs } = await supabase
            .from("transactions")
            .select("tx_hash")
            .eq("wallet_address", walletAddress);
          
          const existingTxHashes = new Set(existingTxs?.map(tx => tx.tx_hash) || []);
          
          // Filtrer les nouvelles transactions
          const newTransactions = data.result.filter(tx => !existingTxHashes.has(tx.hash));
          
          if (newTransactions.length > 0) {
            // Convertir les transactions au format de notre base de données
            const formattedTxs = newTransactions.map(tx => ({
              wallet_address: walletAddress.toLowerCase(),
              tx_hash: tx.hash,
              tx_type: 'transfer',  // À affiner avec un meilleur système de détection
              amount: parseInt(tx.value) / 1e18,  // Conversion de wei à Ether
              token_symbol: chain === "eth" ? "ETH" : "MATIC",
              network_id: chain === "eth" ? 1 : chain === "polygon" ? 137 : parseInt(moralisChain),
              timestamp: new Date(parseInt(tx.block_timestamp) * 1000).toISOString(),
              status: 'confirmed',
              details: {
                from: tx.from_address,
                to: tx.to_address,
                gas: tx.gas,
                gas_price: tx.gas_price,
                block_number: tx.block_number
              }
            }));
            
            // Insérer les nouvelles transactions
            const { error: insertError } = await supabase
              .from("transactions")
              .insert(formattedTxs);
            
            if (insertError) {
              console.error("Error inserting transactions:", insertError);
            }
          }
        }
        
        return new Response(
          JSON.stringify({ transactions: data.result || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (path === "nfts") {
        // Récupérer les NFTs d'un wallet
        const walletAddress = url.searchParams.get("address");
        const chain = url.searchParams.get("chain") || "eth";
        
        if (!walletAddress) {
          return new Response(
            JSON.stringify({ error: "Wallet address is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Appel à l'API Moralis
        const moralisChain = chain === "eth" ? "0x1" : chain === "polygon" ? "0x89" : chain;
        const moralisUrl = `https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=${moralisChain}&format=decimal`;
        
        const response = await fetch(moralisUrl, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`API error: ${data.message || "Unknown error"}`);
        }
        
        return new Response(
          JSON.stringify({ nfts: data.result || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (path === "tokenBalances") {
        // Récupérer les balances de tokens ERC20 d'un wallet
        const walletAddress = url.searchParams.get("address");
        const chain = url.searchParams.get("chain") || "eth";
        
        if (!walletAddress) {
          return new Response(
            JSON.stringify({ error: "Wallet address is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Appel à l'API Moralis
        const moralisChain = chain === "eth" ? "0x1" : chain === "polygon" ? "0x89" : chain;
        const moralisUrl = `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${moralisChain}`;
        
        const response = await fetch(moralisUrl, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`API error: ${data.message || "Unknown error"}`);
        }
        
        // Synchroniser avec la base de données
        if (data.result && data.result.length > 0) {
          const networkId = chain === "eth" ? 1 : chain === "polygon" ? 137 : parseInt(moralisChain);
          
          // Pour chaque token, mettre à jour ou insérer dans la base de données
          for (const token of data.result) {
            const tokenBalance = {
              wallet_address: walletAddress.toLowerCase(),
              token_symbol: token.symbol,
              balance: parseInt(token.balance) / Math.pow(10, parseInt(token.decimals)),
              network_id: networkId,
              last_updated: new Date().toISOString()
            };
            
            // Vérifier si l'entrée existe déjà
            const { data: existingBalance } = await supabase
              .from("token_balances")
              .select("*")
              .eq("wallet_address", walletAddress.toLowerCase())
              .eq("token_symbol", token.symbol)
              .eq("network_id", networkId)
              .single();
            
            if (existingBalance) {
              // Mettre à jour le solde
              await supabase
                .from("token_balances")
                .update({
                  balance: tokenBalance.balance,
                  last_updated: tokenBalance.last_updated
                })
                .eq("id", existingBalance.id);
            } else {
              // Insérer un nouveau solde
              await supabase
                .from("token_balances")
                .insert([tokenBalance]);
            }
          }
        }
        
        return new Response(
          JSON.stringify({ tokens: data.result || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else if (req.method === "POST") {
      if (path === "registerProfile") {
        // Enregistrer un nouveau profil utilisateur lors de la première connexion
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authData.user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const requestData = await req.json();
        const { walletAddress } = requestData;
        
        if (!walletAddress) {
          return new Response(
            JSON.stringify({ error: "Wallet address is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Vérifier si le profil existe déjà
        const { data: existingProfile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("wallet_address", walletAddress.toLowerCase())
          .single();
        
        if (existingProfile) {
          return new Response(
            JSON.stringify({ profile: existingProfile, message: "Profile already exists" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Créer un nouveau profil
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .insert([{
            wallet_address: walletAddress.toLowerCase(),
            username: requestData.username || `user_${walletAddress.substring(2, 8)}`,
            email: requestData.email || null,
            avatar_url: requestData.avatar_url || null
          }])
          .select()
          .single();
        
        if (profileError) {
          return new Response(
            JSON.stringify({ error: profileError.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        return new Response(
          JSON.stringify({ profile, message: "Profile created successfully" }),
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
