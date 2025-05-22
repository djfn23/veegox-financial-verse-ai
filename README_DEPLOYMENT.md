
# Déploiement des contrats Veegox

## Vue d'ensemble

Ce projet inclut les smart contracts pour l'écosystème Veegox et les outils nécessaires pour les déployer sur différents réseaux blockchain.

## Structure des fichiers

- `src/contracts/` - Contient les sources des contrats intelligents Solidity
- `src/artifacts/` - Contiendra les contrats compilés (généré après la compilation)
- `src/contracts/abis/` - Contient les ABIs extraits pour l'intégration frontend
- `src/contracts/addresses.json` - Stocke les adresses des contrats déployés par réseau
- `src/deployments/` - Stocke les logs de déploiement
- `src/scripts/deploy.js` - Script de déploiement principal
- `src/scripts/extract-abis.js` - Script pour extraire les ABIs

## Préparation au déploiement

1. **Configurer l'environnement**

   Créez un fichier `.env` à la racine du projet:

   ```
   PRIVATE_KEY=votre_clé_privée_ici
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Compiler les contrats**

   ```bash
   npx hardhat compile
   ```

4. **Extraire les ABIs**

   ```bash
   node src/scripts/extract-abis.js
   ```

## Déploiement

Voir `src/contracts/DEPLOYMENT.md` pour des instructions détaillées sur le déploiement.

## RPC URLs

Les URLs RPC pour les différents réseaux sont configurées dans `src/services/blockchain-config.ts`. Ces mêmes URLs sont utilisées pour le déploiement via Hardhat.

## Après le déploiement

Une fois les contrats déployés, leurs adresses sont automatiquement mises à jour dans `src/contracts/addresses.json`. L'application utilisera ces adresses pour interagir avec les contrats.
