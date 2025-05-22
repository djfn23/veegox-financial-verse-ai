
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Configuration des endpoints Moralis
const moralisEndpoints = {
  eth: {
    main: "https://site1.moralis-nodes.com/eth/90afb0797cab47f191f20e328e580934",
    fallback: "https://site2.moralis-nodes.com/eth/90afb0797cab47f191f20e328e580934"
  },
  polygon: {
    main: "https://site1.moralis-nodes.com/polygon/baf10e3714e745cda2aeb7cd01e89600",
    fallback: "https://site2.moralis-nodes.com/polygon/baf10e3714e745cda2aeb7cd01e89600"
  }
};

// Fonction pour obtenir une URL d'API Moralis basée sur la chaîne
function getMoralisApiUrl(chain: string, path: string): string {
  const baseUrl = "https://deep-index.moralis.io/api/v2";
  return `${baseUrl}${path}`;
}

// Fonction pour obtenir le chainId Moralis
function getMoralisChainId(chain: string): string {
  switch (chain.toLowerCase()) {
    case "ethereum":
    case "eth":
      return "0x1"; // Ethereum Mainnet
    case "polygon":
      return "0x89"; // Polygon Mainnet
    case "bsc":
      return "0x38"; // BSC Mainnet
    case "goerli":
      return "0x5"; // Goerli Testnet
    case "sepolia":
      return "0xaa36a7"; // Sepolia Testnet
    case "mumbai":
      return "0x13881"; // Mumbai Testnet
    default:
      return "0x1"; // Default to Ethereum Mainnet
  }
}

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
  const moralisApiKey = Deno.env.get("Moralis") as string;
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Déterminer l'action à partir du corps ou des paramètres d'URL
    let action, params;
    
    if (req.method === "POST") {
      const body = await req.json();
      action = body.path;
      params = body;
    } else if (req.method === "GET") {
      const url = new URL(req.url);
      action = url.pathname.split("/").pop();
      params = Object.fromEntries(url.searchParams);
    }
    
    // Vérifier si l'action est définie
    if (!action) {
      throw new Error("Action non spécifiée");
    }
    
    // Traiter les différentes actions
    switch (action) {
      case "transactions": {
        const { address, chain = "eth" } = params;
        
        if (!address) {
          throw new Error("Adresse wallet requise");
        }
        
        // Appel à l'API Moralis
        const moralisChain = getMoralisChainId(chain);
        const moralisUrl = getMoralisApiUrl(chain, `/${address}/transactions`);
        
        const response = await fetch(`${moralisUrl}?chain=${moralisChain}`, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${data.message || "Erreur inconnue"}`);
        }
        
        // Enregistrer les transactions dans Supabase
        if (data.result && data.result.length > 0) {
          // Récupérer les transactions existantes
          const { data: existingTxs } = await supabase
            .from("transactions")
            .select("tx_hash")
            .eq("wallet_address", address.toLowerCase());
          
          const existingTxHashes = new Set(existingTxs?.map(tx => tx.tx_hash) || []);
          
          // Filtrer les nouvelles transactions
          const newTransactions = data.result.filter(tx => !existingTxHashes.has(tx.hash));
          
          if (newTransactions.length > 0) {
            // Convertir les transactions au format de notre base de données
            const formattedTxs = newTransactions.map(tx => ({
              wallet_address: address.toLowerCase(),
              tx_hash: tx.hash,
              tx_type: 'transfer',  // À affiner avec un meilleur système de détection
              amount: parseInt(tx.value) / 1e18,  // Conversion de wei à Ether
              token_symbol: chain === "eth" ? "ETH" : chain === "polygon" ? "MATIC" : "ETH",
              network_id: chain === "eth" ? 1 : chain === "polygon" ? 137 : parseInt(moralisChain, 16),
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
      
      case "nfts": {
        const { address, chain = "eth" } = params;
        
        if (!address) {
          throw new Error("Adresse wallet requise");
        }
        
        // Appel à l'API Moralis
        const moralisChain = getMoralisChainId(chain);
        const moralisUrl = getMoralisApiUrl(chain, `/${address}/nft`);
        
        const response = await fetch(`${moralisUrl}?chain=${moralisChain}&format=decimal`, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${data.message || "Erreur inconnue"}`);
        }
        
        return new Response(
          JSON.stringify({ nfts: data.result || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "tokenBalances": {
        const { address, chain = "eth" } = params;
        
        if (!address) {
          throw new Error("Adresse wallet requise");
        }
        
        // Appel à l'API Moralis
        const moralisChain = getMoralisChainId(chain);
        const moralisUrl = getMoralisApiUrl(chain, `/${address}/erc20`);
        
        const response = await fetch(`${moralisUrl}?chain=${moralisChain}`, {
          headers: {
            "Accept": "application/json",
            "X-API-Key": moralisApiKey
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${data.message || "Erreur inconnue"}`);
        }
        
        // Synchroniser avec la base de données
        if (data.result && data.result.length > 0) {
          const networkId = chain === "eth" ? 1 : chain === "polygon" ? 137 : parseInt(moralisChain, 16);
          
          // Pour chaque token, mettre à jour ou insérer dans la base de données
          for (const token of data.result) {
            const tokenBalance = {
              wallet_address: address.toLowerCase(),
              token_symbol: token.symbol,
              balance: parseInt(token.balance) / Math.pow(10, parseInt(token.decimals)),
              network_id: networkId,
              last_updated: new Date().toISOString()
            };
            
            // Vérifier si l'entrée existe déjà
            const { data: existingBalance } = await supabase
              .from("token_balances")
              .select("*")
              .eq("wallet_address", address.toLowerCase())
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
      
      case "registerProfile": {
        if (req.method !== "POST") {
          throw new Error("Cette action nécessite une requête POST");
        }
        
        const { walletAddress, username, email, avatar_url } = params;
        
        if (!walletAddress) {
          throw new Error("Adresse wallet requise");
        }
        
        // Vérifier si le profil existe déjà
        const { data: existingProfile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("wallet_address", walletAddress.toLowerCase())
          .single();
        
        if (existingProfile) {
          return new Response(
            JSON.stringify({ profile: existingProfile, message: "Profil existant" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Créer un nouveau profil
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .insert([{
            wallet_address: walletAddress.toLowerCase(),
            username: username || `user_${walletAddress.substring(2, 8)}`,
            email: email || null,
            avatar_url: avatar_url || null
          }])
          .select()
          .single();
        
        if (profileError) {
          throw new Error(`Erreur lors de la création du profil: ${profileError.message}`);
        }
        
        return new Response(
          JSON.stringify({ profile, message: "Profil créé avec succès" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      default:
        throw new Error(`Action non supportée: ${action}`);
    }
    
  } catch (error) {
    console.error("Erreur:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Une erreur s'est produite" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
