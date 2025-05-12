
import React from "react";

const GovernanceDomains: React.FC = () => {
  return (
    <div className="bg-veegox-card-bg p-6 rounded-lg">
      <h4 className="font-bold text-xl mb-4">Domaines de Décision DAO</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Paramètres des produits financiers</li>
          <li>Allocation des fonds de la trésorerie</li>
          <li>Mise à niveau des contrats intelligents</li>
          <li>Intégration de nouvelles chaînes/actifs</li>
        </ul>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Ajustements de tokenomics</li>
          <li>Partenariats stratégiques</li>
          <li>Initiatives de marketing</li>
          <li>Changements de gouvernance</li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceDomains;
