
#!/bin/sh
set -e

NODE_ID=${NODE_ID:-1}
CHAIN_ID=${CHAIN_ID:-1999}
BLOCK_GAS_LIMIT=${BLOCK_GAS_LIMIT:-30000000}

echo "🚀 Démarrage du nœud VeegoxChain #${NODE_ID}"
echo "   - Chain ID: ${CHAIN_ID}"
echo "   - Block Gas Limit: ${BLOCK_GAS_LIMIT}"

# Vérifier que le nœud existe
if [ ! -d "/chain/nodes/node${NODE_ID}" ]; then
    echo "❌ Erreur: Nœud ${NODE_ID} non trouvé"
    exit 1
fi

# Vérifier que genesis.json existe
if [ ! -f "/chain/genesis.json" ]; then
    echo "❌ Erreur: genesis.json non trouvé"
    exit 1
fi

# Démarrer le nœud
exec polygon-edge server \
    --data-dir "/chain/nodes/node${NODE_ID}" \
    --chain "/chain/genesis.json" \
    --grpc-address "0.0.0.0:9632" \
    --libp2p "0.0.0.0:10000" \
    --jsonrpc "0.0.0.0:8545" \
    --prometheus "0.0.0.0:9090" \
    --seal
