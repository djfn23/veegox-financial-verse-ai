
import React from "react";

const TableOfContents: React.FC = () => {
  return (
    <div className="bg-veegox-card-bg rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold mb-4">Table des matières</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ol className="list-decimal list-inside space-y-2">
            <li><a href="#introduction" className="text-veegox-purple hover:text-veegox-blue transition-colors">Introduction</a></li>
            <li><a href="#vision" className="text-veegox-purple hover:text-veegox-blue transition-colors">Vision et Mission</a></li>
            <li><a href="#ecosystem" className="text-veegox-purple hover:text-veegox-blue transition-colors">Écosystème Veegox</a></li>
            <li><a href="#tokens" className="text-veegox-purple hover:text-veegox-blue transition-colors">Tokenomics</a></li>
            <li><a href="#lending" className="text-veegox-purple hover:text-veegox-blue transition-colors">Crédit Décentralisé</a></li>
          </ol>
        </div>
        <div>
          <ol className="list-decimal list-inside space-y-2" start={6}>
            <li><a href="#savings" className="text-veegox-purple hover:text-veegox-blue transition-colors">Épargne et Staking</a></li>
            <li><a href="#governance" className="text-veegox-purple hover:text-veegox-blue transition-colors">Gouvernance DAO</a></li>
            <li><a href="#ai-investing" className="text-veegox-purple hover:text-veegox-blue transition-colors">Investissement IA</a></li>
            <li><a href="#roadmap" className="text-veegox-purple hover:text-veegox-blue transition-colors">Feuille de Route</a></li>
            <li><a href="#team" className="text-veegox-purple hover:text-veegox-blue transition-colors">Équipe et Partenaires</a></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
