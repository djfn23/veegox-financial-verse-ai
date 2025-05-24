# VeegoxChain Frontend

Dashboard Web3 moderne pour la blockchain VeegoxChain.

## Fonctionnalités
- Connexion Metamask (wagmi)
- Affichage du solde VEX
- Transactions récentes
- Statistiques réseau (bloc courant, gas limit, timestamp)
- UI responsive, branding Veegox

## Installation

```bash
cd frontend
npm install
```

## Lancement en développement

```bash
npm run dev
```

Accédez à [http://localhost:5173](http://localhost:5173) pour voir le dashboard.

## Configuration
- Le frontend s'attend à ce que l'API backend soit disponible sur `/api` (proxy ou même domaine en dev).

## Personnalisation
- Couleurs, polices et branding modifiables dans `tailwind.config.js` et les composants React.

## Dépendances principales
- React, Vite, Tailwind CSS, shadcn/ui
- wagmi, ethers.js, @rainbow-me/rainbowkit

---

Pour toute question ou évolution, contactez l'équipe VeegoxChain.
