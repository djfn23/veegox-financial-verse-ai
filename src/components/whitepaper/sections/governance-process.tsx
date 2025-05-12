
import React from "react";

const GovernanceProcess: React.FC = () => {
  return (
    <div className="mb-6">
      <h4 className="font-bold text-xl mb-4">Processus de Gouvernance</h4>
      <ol className="list-decimal list-inside space-y-4 ml-4">
        <li className="pl-2">
          <span className="font-semibold">Soumission de Proposition</span>
          <p className="text-gray-300 ml-6 mt-1">Les détenteurs de gVEX (min. 100,000 points) peuvent soumettre des propositions formelles pour améliorer l'écosystème.</p>
        </li>
        <li className="pl-2">
          <span className="font-semibold">Phase de Discussion</span>
          <p className="text-gray-300 ml-6 mt-1">Période de 7 jours où la communauté débat de la proposition et peut suggérer des modifications.</p>
        </li>
        <li className="pl-2">
          <span className="font-semibold">Vote Formel</span>
          <p className="text-gray-300 ml-6 mt-1">Période de vote de 5 jours où les détenteurs de gVEX votent pour ou contre la proposition.</p>
        </li>
        <li className="pl-2">
          <span className="font-semibold">Mise en Œuvre</span>
          <p className="text-gray-300 ml-6 mt-1">Si approuvée ({`>`}66%), la proposition est implémentée par l'équipe technique ou via des contrats intelligents automatisés.</p>
        </li>
      </ol>
    </div>
  );
};

export default GovernanceProcess;
