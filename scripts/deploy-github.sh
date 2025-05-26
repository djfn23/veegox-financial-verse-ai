
#!/bin/bash
# Script de déploiement GitHub pour VeegoxChain

set -e

ENVIRONMENT=${1:-staging}
GITHUB_REPO=${2:-""}

echo "🚀 Déploiement VeegoxChain sur GitHub"
echo "   Environment: $ENVIRONMENT"
echo "   Repository: $GITHUB_REPO"

# Vérifier les prérequis
if [ -z "$GITHUB_REPO" ]; then
    echo "❌ Erreur: Repository GitHub requis"
    echo "Usage: $0 <environment> <github-repo>"
    exit 1
fi

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Erreur: Docker n'est pas installé"
    exit 1
fi

# Vérifier que git est configuré
if ! git config user.email &> /dev/null; then
    echo "❌ Erreur: Git n'est pas configuré"
    exit 1
fi

echo "📦 Préparation des fichiers..."

# Copier les fichiers de configuration d'environnement
if [ ! -f "blockchain/.env.${ENVIRONMENT}" ]; then
    echo "⚠️  Création du fichier d'environnement par défaut"
    cat > "blockchain/.env.${ENVIRONMENT}" << EOF
CHAIN_ID=1999
BLOCK_GAS_LIMIT=30000000
NODE1_RPC_PORT=8545
NODE2_RPC_PORT=8546
NODE3_RPC_PORT=8547
PROMETHEUS_PORT=9090
GRAFANA_PORT=3000
GRAFANA_PASSWORD=admin123
EOF
fi

echo "🔧 Construction des images Docker..."

# Construire l'image de production
cd blockchain
docker build -f Dockerfile.production -t "ghcr.io/${GITHUB_REPO}/veegoxchain:${ENVIRONMENT}" .

echo "🚢 Push vers GitHub Container Registry..."

# Se connecter à GHCR (nécessite GITHUB_TOKEN)
if [ -n "$GITHUB_TOKEN" ]; then
    echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
    docker push "ghcr.io/${GITHUB_REPO}/veegoxchain:${ENVIRONMENT}"
    echo "✅ Image poussée vers GHCR"
else
    echo "⚠️  GITHUB_TOKEN non défini, push manuel requis"
fi

echo "📋 Instructions de déploiement:"
echo ""
echo "1. Configurer les secrets GitHub:"
echo "   - VEEGOX_PRIVATE_KEY: Clé privée pour le déploiement des contrats"
echo "   - GITHUB_TOKEN: Token pour GHCR (optionnel)"
echo ""
echo "2. Déclencher le workflow:"
echo "   - Push sur main/develop"
echo "   - Ou utiliser 'workflow_dispatch' manuellement"
echo ""
echo "3. Surveiller les logs:"
echo "   - GitHub Actions: https://github.com/${GITHUB_REPO}/actions"
echo "   - Grafana: http://localhost:3000 (après déploiement)"
echo ""
echo "🎉 Déploiement préparé avec succès!"
