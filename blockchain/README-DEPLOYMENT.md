
# Guide de déploiement VeegoxChain

Ce guide vous accompagne dans le déploiement des contrats Veegox sur votre blockchain VeegoxChain indépendante.

## Prérequis

1. **Polygon Edge installé** : `polygon-edge` doit être disponible dans votre PATH
2. **Node.js et npm** : Pour exécuter les scripts de déploiement
3. **Clé privée** : Avec des fonds VEX natifs pour les frais de gas

## Étape 1 : Initialisation de VeegoxChain

Si ce n'est pas déjà fait, initialisez votre blockchain :

```bash
cd blockchain
chmod +x init-veegoxchain.sh
./init-veegoxchain.sh
```

## Étape 2 : Démarrage de la blockchain

Démarrez les nœuds validateurs :

```bash
chmod +x start-veegoxchain.sh
./start-veegoxchain.sh
```

Votre blockchain sera accessible via :
- Nœud 1 : http://localhost:10002
- Nœud 2 : http://localhost:20002  
- Nœud 3 : http://localhost:30002

## Étape 3 : Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```bash
PRIVATE_KEY=votre_clé_privée_ici
```

⚠️ **Important** : Assurez-vous que votre compte a suffisamment de VEX natifs pour payer les frais de gas.

## Étape 4 : Compilation des contrats

```bash
npx hardhat compile
```

## Étape 5 : Déploiement sur VeegoxChain

Déployez tous les contrats sur votre blockchain :

```bash
npx hardhat run src/scripts/deploy-veegoxchain.js --network veegoxchain
```

Le script déploiera dans cet ordre :
1. 🪙 VEXToken
2. 💰 VeegoxTreasury
3. 🗳️ GovernanceVEX (gVEX)
4. 🥩 VeegoxStaking
5. 🏛️ VeegoxDAO

## Étape 6 : Vérification du déploiement

Vérifiez que tous les contrats fonctionnent correctement :

```bash
npx hardhat run src/scripts/verify-deployment.js --network veegoxchain
```

## Étape 7 : Extraction des ABIs (si nécessaire)

```bash
node src/scripts/extract-abis.js
```

## Résultats du déploiement

Après un déploiement réussi :

- ✅ Les adresses sont sauvegardées dans `src/contracts/addresses.json`
- 📁 Un log détaillé est créé dans `src/deployments/`
- 🔧 Tous les contrats sont interconnectés et configurés
- 🌐 L'application frontend peut maintenant interagir avec VeegoxChain

## Dépannage

### Erreur de connexion au réseau
- Vérifiez que VeegoxChain fonctionne : `curl http://localhost:10002`
- Consultez les logs des nœuds : `tail -f blockchain/nodes/node*/logs/*.log`

### Erreur de fonds insuffisants
- Vérifiez le solde de votre compte de déploiement
- Assurez-vous d'avoir assez de VEX natifs pour les frais de gas

### Erreur de compilation
- Exécutez `npx hardhat clean` puis `npx hardhat compile`
- Vérifiez que toutes les dépendances sont installées

## URLs de référence

- **Chain ID** : 1999
- **RPC Principal** : http://localhost:10002
- **Block Explorer** : http://localhost:4000 (si configuré)
- **Nom du réseau** : VeegoxChain

## Scripts utiles

```bash
# Démarrer la blockchain
./blockchain/start-veegoxchain.sh

# Arrêter la blockchain  
killall polygon-edge

# Redéployer un contrat spécifique
npx hardhat run src/scripts/deploy-veegoxchain.js --network veegoxchain

# Vérifier le statut
npx hardhat run src/scripts/verify-deployment.js --network veegoxchain
```
