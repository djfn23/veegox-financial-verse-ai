
# Déploiement VeegoxChain sur GitHub

Ce guide explique comment déployer VeegoxChain automatiquement via GitHub Actions et Docker.

## Architecture de déploiement

```
GitHub Repository
├── .github/workflows/
│   ├── deploy-veegoxchain.yml    # Déploiement automatique
│   └── test-blockchain.yml       # Tests et validation
├── blockchain/
│   ├── docker-compose.production.yml  # Configuration production
│   ├── Dockerfile.production           # Image Docker optimisée
│   └── monitoring/                     # Prometheus & Grafana
└── scripts/
    └── deploy-github.sh          # Script de déploiement manuel
```

## Configuration initiale

### 1. Secrets GitHub requis

Configurez ces secrets dans Settings > Secrets and variables > Actions :

```bash
VEEGOX_PRIVATE_KEY=0x...     # Clé privée pour déployer les contrats
GITHUB_TOKEN=ghp_...         # Token pour GHCR (optionnel)
```

### 2. Variables d'environnement

Créez un fichier `.env.production` dans le dossier `blockchain/` :

```env
CHAIN_ID=1999
BLOCK_GAS_LIMIT=30000000
NODE1_RPC_PORT=8545
NODE2_RPC_PORT=8546
NODE3_RPC_PORT=8547
PROMETHEUS_PORT=9090
GRAFANA_PORT=3000
GRAFANA_PASSWORD=votre_mot_de_passe_securise
```

## Déploiement automatique

### Via GitHub Actions

1. **Push sur main/develop** : Déclenche automatiquement les tests et le déploiement
2. **Manual dispatch** : Depuis l'onglet Actions, déclenchez manuellement le workflow

### Étapes du workflow

1. **Build** : Construction de l'image Docker VeegoxChain
2. **Test** : Validation des smart contracts et de la blockchain
3. **Deploy** : Déploiement des contrats sur VeegoxChain
4. **Monitor** : Configuration du monitoring Prometheus/Grafana

## Déploiement manuel

### Utilisation du script

```bash
# Déploiement staging
./scripts/deploy-github.sh staging username/repository

# Déploiement production
./scripts/deploy-github.sh production username/repository
```

### Docker Compose local

```bash
cd blockchain

# Démarrage avec monitoring
docker-compose -f docker-compose.production.yml up -d

# Vérification des logs
docker-compose logs -f veegoxchain-node1

# Arrêt
docker-compose down
```

## Monitoring et maintenance

### Accès aux services

- **Blockchain RPC** : http://localhost:8545, 8546, 8547
- **Prometheus** : http://localhost:9090
- **Grafana** : http://localhost:3000 (admin/mot_de_passe_configuré)

### Commandes utiles

```bash
# Vérifier la santé de la blockchain
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'

# Obtenir le dernier bloc
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Logs en temps réel
docker logs -f veegoxchain-node1
```

### Scaling et haute disponibilité

Pour un déploiement en production :

1. **Load Balancer** : Distribuez les requêtes RPC entre les nœuds
2. **Backup** : Sauvegardez régulièrement les volumes Docker
3. **Monitoring** : Configurez des alertes dans Grafana
4. **Security** : Utilisez des secrets sécurisés et des réseaux privés

## Résolution de problèmes

### Erreurs communes

**Nœud ne démarre pas** :
```bash
# Vérifier les logs
docker logs veegoxchain-node1

# Vérifier les permissions
chmod +x blockchain/docker-entrypoint.sh
```

**Échec de déploiement des contrats** :
```bash
# Vérifier que la blockchain fonctionne
curl http://localhost:8545

# Vérifier la clé privée dans les secrets GitHub
```

**Problèmes de réseau** :
```bash
# Vérifier les ports Docker
docker port veegoxchain-node1

# Tester la connectivité
telnet localhost 8545
```

## Support et contribution

- **Issues** : Rapportez les problèmes sur GitHub
- **Documentation** : Consultez `/blockchain/README-DEPLOYMENT.md`
- **Discord** : Rejoignez la communauté Veegox

---

**🚀 VeegoxChain est maintenant prête pour le déploiement sur GitHub !**
