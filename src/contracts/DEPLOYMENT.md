
# Guide de déploiement des contrats Veegox

Ce document explique comment déployer les contrats intelligents Veegox sur différents réseaux blockchain.

## Prérequis

1. Avoir Node.js et npm installés
2. Avoir configuré une clé privée avec des fonds pour le réseau cible

## Configuration

1. Créez un fichier `.env` à la racine du projet avec la clé privée du wallet de déploiement:

```
PRIVATE_KEY=votre_clé_privée_ici
```

## Compilation des contrats

Compilez les contrats avec Hardhat:

```bash
npx hardhat compile
```

## Extraction des ABIs

Après la compilation, extrayez les ABIs:

```bash
node src/scripts/extract-abis.js
```

## Déploiement des contrats

### Sur un réseau de test

Pour déployer sur Goerli:

```bash
npx hardhat run src/scripts/deploy.js --network goerli
```

Pour déployer sur Sepolia:

```bash
npx hardhat run src/scripts/deploy.js --network sepolia
```

Pour déployer sur Mumbai:

```bash
npx hardhat run src/scripts/deploy.js --network mumbai
```

### Sur le mainnet

Pour déployer sur Ethereum:

```bash
npx hardhat run src/scripts/deploy.js --network ethereum
```

Pour déployer sur Polygon:

```bash
npx hardhat run src/scripts/deploy.js --network polygon
```

## Vérification des contrats

Les adresses des contrats déployés sont automatiquement sauvegardées dans `src/contracts/addresses.json` après le déploiement.

Un log du déploiement est également créé dans le dossier `src/deployments/`.

## Déploiement de StableVEX

Le token StableVEX nécessite des adresses d'oracles de prix (Chainlink) pour fonctionner. Un script de déploiement séparé sera ajouté pour ce contrat.

## Après le déploiement

Après le déploiement, les adresses des contrats sont automatiquement mises à jour dans l'application. Aucune action supplémentaire n'est requise.
