
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WhitepaperConclusion: React.FC = () => {
  return (
    <div className="bg-veegox-gradient p-0.5 rounded-lg mb-12">
      <div className="bg-veegox-darker-bg rounded-md p-8 text-center">
        <h3 className="text-xl font-bold mb-4">Rejoignez la Révolution Financière Décentralisée</h3>
        <p className="mb-6">
          Veegox représente la prochaine génération de services financiers, combinant le meilleur de la DeFi et de l'IA
          pour créer un écosystème ouvert, équitable et accessible à tous.
        </p>
        <Button className="bg-veegox-purple hover:bg-veegox-deep-purple">
          <Link to="/contact">Contactez l'équipe</Link>
        </Button>
      </div>
    </div>
  );
};

export default WhitepaperConclusion;
