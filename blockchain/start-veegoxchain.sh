
#!/bin/bash
# Script pour démarrer VeegoxChain
set -e

CHAIN_DIR="$(dirname "$0")"
NODES_DIR="$CHAIN_DIR/nodes"
EDGE_BIN="polygon-edge"

echo "🚀 Démarrage de VeegoxChain..."

# Vérifier que les nœuds existent
if [ ! -d "$NODES_DIR" ]; then
    echo "❌ Erreur: Les nœuds n'existent pas. Exécutez d'abord init-veegoxchain.sh"
    exit 1
fi

# Fonction pour démarrer un nœud
start_node() {
    local node_id=$1
    local port_start=$((10000 + node_id * 10000))
    local grpc_port=$((port_start + 1))
    local jsonrpc_port=$((port_start + 2))
    local libp2p_port=$((port_start + 3))
    
    echo "🔗 Démarrage du nœud $node_id..."
    echo "   - GRPC: $grpc_port"
    echo "   - JSON-RPC: $jsonrpc_port"
    echo "   - libp2p: $libp2p_port"
    
    $EDGE_BIN server \
        --data-dir "$NODES_DIR/node$node_id" \
        --chain "$CHAIN_DIR/genesis.json" \
        --grpc-address "0.0.0.0:$grpc_port" \
        --libp2p "0.0.0.0:$libp2p_port" \
        --jsonrpc "0.0.0.0:$jsonrpc_port" \
        --seal &
    
    echo "✅ Nœud $node_id démarré (PID: $!)"
}

# Démarrer les 3 nœuds validateurs
for i in 1 2 3; do
    start_node $i
    sleep 2
done

echo ""
echo "🎉 VeegoxChain démarrée avec succès!"
echo ""
echo "📋 Informations de connexion:"
echo "   - Chain ID: 1999"
echo "   - RPC URLs:"
echo "     * http://localhost:10002 (Nœud 1)"
echo "     * http://localhost:20002 (Nœud 2)" 
echo "     * http://localhost:30002 (Nœud 3)"
echo ""
echo "🔧 Pour arrêter la blockchain:"
echo "   killall polygon-edge"
echo ""
echo "📖 Pour voir les logs en temps réel:"
echo "   tail -f $NODES_DIR/node*/logs/*.log"

# Garder le script en vie
wait
