
import React from "react";
import TokenCard from "./token-card";

const TokensDistribution: React.FC = () => {
  const vexFeatures = [
    "Utilisé pour les frais sur la plateforme",
    "Donne accès aux services premium",
    "Peut être staké pour obtenir des récompenses",
    "Offre des droits de gouvernance basiques"
  ];

  const svexFeatures = [
    "Indexé sur l'USDC (1:1)",
    "Utilisé pour l'épargne à rendement fixe",
    "Protection contre la volatilité du marché",
    "Processus de frappe et rachat transparent"
  ];

  const gvexFeatures = [
    "Obtenu via le staking verrouillé de VEX",
    "Donne des droits de vote dans la DAO",
    "Permet de soumettre des propositions",
    "Durée de verrouillage = poids de vote augmenté"
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TokenCard
          name="VEX"
          description="Token principal utilitaire"
          features={vexFeatures}
          footerLabel="Offre totale"
          footerValue="100,000,000 VEX"
          borderColor="border-veegox-purple/30"
        />
        
        <TokenCard
          name="sVEX"
          description="Token stable d'épargne"
          features={svexFeatures}
          footerLabel="Émission"
          footerValue="Dynamique (collatéralisée)"
          borderColor="border-blue-500/30"
        />
        
        <TokenCard
          name="gVEX"
          description="Token de gouvernance"
          features={gvexFeatures}
          footerLabel="Modèle"
          footerValue="Non-transférable"
          borderColor="border-purple-500/30"
        />
      </div>
      
      <h4 className="font-bold text-xl mb-4">Distribution des tokens</h4>
      <div className="bg-veegox-darker-bg p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-2">Allocation initiale</h5>
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
              <li>Vente publique: 40%</li>
              <li>Trésorerie DAO: 20%</li>
              <li>Équipe et conseillers: 15% (bloqués sur 3 ans)</li>
              <li>Développement écosystème: 15%</li>
              <li>Marketing et partenariats: 5%</li>
              <li>Réserve de liquidité: 5%</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Mécanismes économiques</h5>
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
              <li>Rachat et destruction automatique: 30% des frais</li>
              <li>Récompenses staking: 40% des frais</li>
              <li>Trésorerie DAO: 30% des frais</li>
              <li>Émission décroissante avec halvings programmés</li>
              <li>Modèle déflationniste à long terme</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokensDistribution;
