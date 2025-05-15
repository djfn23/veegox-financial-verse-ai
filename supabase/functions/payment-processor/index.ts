
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import * as ethers from 'https://esm.sh/ethers@5.7.2'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Configuration CORS pour permettre les appels depuis le frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Fonctions utilitaires pour le chiffrement/déchiffrement
function decryptPrivateKey(encryptedKey: string, secretKey: string): string {
  try {
    // Déchiffrement simple pour l'exemple (à remplacer par une méthode plus robuste)
    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();
    
    // Transformation base64 -> Uint8Array
    const encKeyBuffer = Uint8Array.from(atob(encryptedKey), c => c.charCodeAt(0));
    const secretBuffer = textEncoder.encode(secretKey);
    
    // XOR simple pour le déchiffrement (exemple seulement)
    const decrypted = new Uint8Array(encKeyBuffer.length);
    for (let i = 0; i < encKeyBuffer.length; i++) {
      decrypted[i] = encKeyBuffer[i] ^ secretBuffer[i % secretBuffer.length];
    }
    
    return textDecoder.decode(decrypted);
  } catch (error) {
    console.error("Erreur lors du déchiffrement:", error);
    throw new Error("Impossible de déchiffrer la clé privée");
  }
}

// Fonction pour valider les transactions et limites
async function validateTransaction(
  supabase: any,
  walletId: string,
  amount: number,
  tokenSymbol: string
): Promise<boolean> {
  // Récupérer les informations du wallet
  const { data: wallet, error: walletError } = await supabase
    .from('admin_wallet')
    .select('daily_limit, is_active, transaction_count')
    .eq('id', walletId)
    .single();

  if (walletError || !wallet) {
    console.error("Erreur lors de la récupération du wallet:", walletError);
    return false;
  }

  // Vérifier si le wallet est actif
  if (!wallet.is_active) {
    console.error("Ce wallet administrateur est désactivé");
    return false;
  }

  // Vérifier si la transaction dépasse la limite quotidienne
  const today = new Date().toISOString().split('T')[0];
  const { data: dailyTotal, error: totalError } = await supabase
    .from('admin_transactions')
    .select('amount')
    .eq('wallet_id', walletId)
    .eq('token_symbol', tokenSymbol)
    .gte('created_at', today)
    .execute();

  if (totalError) {
    console.error("Erreur lors du calcul du total quotidien:", totalError);
    return false;
  }

  const currentDailyTotal = dailyTotal.reduce((sum: number, tx: any) => sum + parseFloat(tx.amount), 0);
  
  if (currentDailyTotal + amount > wallet.daily_limit) {
    console.error(`Transaction refusée: dépassement de la limite quotidienne (${currentDailyTotal + amount}/${wallet.daily_limit})`);
    return false;
  }

  return true;
}

// Fonction principale pour traiter une transaction à partir d'un wallet administrateur
async function processTransaction(
  supabase: any,
  walletId: string,
  recipientAddress: string,
  amount: string,
  tokenSymbol: string,
  networkId: number,
  txType: string,
  metadata: any = {}
) {
  try {
    // Récupérer les informations du wallet admin
    const { data: wallet, error: walletError } = await supabase
      .from('admin_wallet')
      .select('wallet_address, encrypted_private_key')
      .eq('id', walletId)
      .single();

    if (walletError || !wallet) {
      throw new Error(`Wallet admin non trouvé: ${walletError?.message || 'ID invalide'}`);
    }

    // Vérifier les limites et la validité de la transaction
    const amountNum = parseFloat(amount);
    const isValid = await validateTransaction(supabase, walletId, amountNum, tokenSymbol);
    
    if (!isValid) {
      throw new Error('Transaction non valide ou limites dépassées');
    }

    // Journaliser la transaction dans la base de données
    const { data: txRecord, error: txError } = await supabase.rpc(
      'log_admin_transaction',
      {
        p_wallet_id: walletId,
        p_tx_type: txType,
        p_amount: amountNum,
        p_token_symbol: tokenSymbol,
        p_recipient_address: recipientAddress,
        p_metadata: metadata,
        p_network_id: networkId
      }
    );

    if (txError) {
      throw new Error(`Erreur lors de l'enregistrement de la transaction: ${txError.message}`);
    }

    // Dans une implémentation réelle, vous connecteriez le wallet et effectueriez la transaction blockchain ici
    // Pseudo-code pour l'exemple:
    const secretKey = Deno.env.get('ADMIN_ENCRYPTION_KEY') || '';
    if (!secretKey) {
      throw new Error('Clé de chiffrement non configurée');
    }

    // Déchiffrer la clé privée et initialiser le wallet Ethereum
    const privateKey = decryptPrivateKey(wallet.encrypted_private_key, secretKey);
    const provider = new ethers.providers.JsonRpcProvider(getProviderUrl(networkId));
    const signer = new ethers.Wallet(privateKey, provider);

    let txHash: string;
    
    // Transaction différente selon le type de token
    if (tokenSymbol === 'ETH') {
      // Envoi d'ETH natif
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(amount),
      });
      txHash = tx.hash;
      await tx.wait();
    } else {
      // Envoi de tokens ERC-20
      const tokenAddress = getTokenAddress(tokenSymbol, networkId);
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function transfer(address to, uint amount) returns (bool)'],
        signer
      );
      
      const decimals = getTokenDecimals(tokenSymbol);
      const amountBN = ethers.utils.parseUnits(amount, decimals);
      
      const tx = await tokenContract.transfer(recipientAddress, amountBN);
      txHash = tx.hash;
      await tx.wait();
    }

    // Mettre à jour le statut de la transaction
    await supabase
      .from('admin_transactions')
      .update({ 
        status: 'completed',
        tx_hash: txHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', txRecord);

    return {
      success: true,
      transaction_id: txRecord,
      tx_hash: txHash
    };

  } catch (error) {
    console.error("Erreur lors du traitement de la transaction:", error);
    
    // Journaliser l'erreur dans la base de données si possible
    if (error instanceof Error) {
      try {
        await supabase
          .from('admin_transactions')
          .update({ 
            status: 'failed',
            metadata: { ...metadata, error: error.message },
            updated_at: new Date().toISOString()
          })
          .eq('id', metadata.transaction_id);
      } catch (updateError) {
        console.error("Erreur lors de la mise à jour du statut:", updateError);
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

// Fonction utilitaire pour obtenir l'URL du provider selon le réseau
function getProviderUrl(networkId: number): string {
  switch(networkId) {
    case 1: // Ethereum Mainnet
      return Deno.env.get('ETH_RPC_URL') || 'https://mainnet.infura.io/v3/your-api-key';
    case 5: // Goerli Testnet
      return Deno.env.get('GOERLI_RPC_URL') || 'https://goerli.infura.io/v3/your-api-key';
    case 137: // Polygon
      return Deno.env.get('POLYGON_RPC_URL') || 'https://polygon-rpc.com';
    case 80001: // Mumbai Testnet
      return Deno.env.get('MUMBAI_RPC_URL') || 'https://rpc-mumbai.maticvigil.com';
    default:
      return Deno.env.get('ETH_RPC_URL') || 'https://mainnet.infura.io/v3/your-api-key';
  }
}

// Fonction utilitaire pour obtenir l'adresse d'un token
function getTokenAddress(symbol: string, networkId: number): string {
  // À implémenter avec une table de correspondance complète dans une version réelle
  const tokenAddresses: Record<string, Record<number, string>> = {
    'VEX': {
      1: '0x1234567890123456789012345678901234567890', // Adresse fictive sur Mainnet
      5: '0x1234567890123456789012345678901234567891', // Adresse fictive sur Goerli
    },
    'sVEX': {
      1: '0x1234567890123456789012345678901234567892',
      5: '0x1234567890123456789012345678901234567893',
    },
    'gVEX': {
      1: '0x1234567890123456789012345678901234567894',
      5: '0x1234567890123456789012345678901234567895',
    },
    'USDC': {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Vraie adresse USDC sur Mainnet
      5: '0x07865c6e87b9f70255377e024ace6630c1eaa37f', // Vraie adresse USDC sur Goerli
    }
  };

  return tokenAddresses[symbol]?.[networkId] || '0x0000000000000000000000000000000000000000';
}

// Fonction utilitaire pour obtenir les décimales d'un token
function getTokenDecimals(symbol: string): number {
  const tokenDecimals: Record<string, number> = {
    'VEX': 18,
    'sVEX': 18,
    'gVEX': 18,
    'USDC': 6,
    'ETH': 18
  };

  return tokenDecimals[symbol] || 18;
}

// Point d'entrée principal de la fonction edge
serve(async (req) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Vérifier l'authentification et les autorisations
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authentification requise');
    }
    
    // Vérifier le token JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Non autorisé');
    }
    
    // Vérifier si l'utilisateur a le rôle admin
    const { data: roleData, error: roleError } = await supabaseClient
      .rpc('is_super_admin_function', { user_id: user.id });
      
    if (roleError || !roleData) {
      throw new Error('Accès refusé: rôle insuffisant');
    }

    // Traiter la requête selon l'action demandée
    const { action, ...params } = await req.json();
    let result;

    switch (action) {
      case 'send_transaction':
        result = await processTransaction(
          supabaseClient,
          params.wallet_id,
          params.recipient_address,
          params.amount,
          params.token_symbol,
          params.network_id,
          params.tx_type || 'payment',
          params.metadata || {}
        );
        break;
        
      case 'get_wallet_info':
        const { data: walletInfo, error: walletError } = await supabaseClient
          .from('admin_wallet')
          .select('id, wallet_address, is_active, daily_limit, transaction_count, last_used, created_at')
          .eq('is_active', true);
          
        if (walletError) {
          throw new Error(`Erreur lors de la récupération des wallets: ${walletError.message}`);
        }
        
        result = { wallets: walletInfo };
        break;
        
      default:
        throw new Error(`Action non reconnue: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error("Erreur:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
})
