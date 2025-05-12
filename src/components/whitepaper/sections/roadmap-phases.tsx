
import React from "react";

const RoadmapPhases: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h4 className="font-bold text-xl mb-4 text-veegox-purple">Phase 1: Fondation (T3 2023 - T1 2024)</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Développement des smart contracts core</li>
          <li>Audit de sécurité initial</li>
          <li>Lancement du token VEX</li>
          <li>Interface utilisateur de base pour le prêt et l'épargne</li>
          <li>Déploiement testnet et programme de bug bounty</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-xl mb-4 text-veegox-blue">Phase 2: Expansion (T2 2024 - T4 2024)</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Lancement des tokens sVEX et gVEX</li>
          <li>Implémentation du système de scoring on-chain</li>
          <li>Déploiement du module d'épargne et staking</li>
          <li>Première version de la DAO de gouvernance</li>
          <li>Intégration multi-chaînes (Ethereum, Polygon, Arbitrum)</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-xl mb-4 text-purple-400">Phase 3: Innovation (T1 2025 - T3 2025)</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Lancement du module d'investissement IA</li>
          <li>Marchés de prêts entre pairs</li>
          <li>Intégration des NFT comme garantie</li>
          <li>Expansion vers les chaînes L2 émergentes</li>
          <li>Programmes de partenariat et d'intégration</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-xl mb-4 text-pink-400">Phase 4: Maturité (T4 2025 et au-delà)</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Version 2.0 de l'architecture Veegox</li>
          <li>Produits financiers avancés (dérivés, options)</li>
          <li>Décentralisation complète de la gouvernance</li>
          <li>Outils institutionnels</li>
          <li>Infrastructure pour projets tiers</li>
        </ul>
      </div>
    </div>
  );
};

export default RoadmapPhases;
