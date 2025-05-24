#!/bin/bash
# Script d'initialisation de VeegoxChain (Polygon Edge)
# Génère genesis.json, accounts.json, clés de nœuds et prépare le réseau local

set -e

CHAIN_DIR="$(dirname "$0")"
EDGE_BIN="polygon-edge"

GENESIS_FILE="$CHAIN_DIR/genesis.json"
ACCOUNTS_FILE="$CHAIN_DIR/accounts.json"
NODES_DIR="$CHAIN_DIR/nodes"

SUPPLY="1000000000000000000000000000" # 1 milliard * 10^18
TOKEN_NAME="VEX"
CHAIN_NAME="VeegoxChain"

# 1. Générer les clés de nœuds (3 validateurs par défaut)
mkdir -p "$NODES_DIR"
for i in 1 2 3; do
  $EDGE_BIN secrets init --data-dir "$NODES_DIR/node$i"
done

# 2. Générer genesis.json
$EDGE_BIN genesis --consensus ibft --ibft-validators-prefix-path "$NODES_DIR" --chain-id 1999 --name "$CHAIN_NAME" --burn-contract --premine "0x000000000000000000000000000000000000dead:$SUPPLY" --token-name "$TOKEN_NAME" --token-symbol "$TOKEN_NAME" --token-decimals 18 --block-gas-limit 30000000 --epoch-size 100 --validators-path "$NODES_DIR" --json > "$GENESIS_FILE"

echo "Genesis et clés générés dans $CHAIN_DIR"
