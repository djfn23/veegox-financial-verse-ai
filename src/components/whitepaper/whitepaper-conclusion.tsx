
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WhitepaperConclusion: React.FC = () => {
  return (
    <div className="bg-veegox-gradient p-0.5 rounded-lg mb-12">
      <div className="bg-veegox-darker-bg rounded-md p-8 text-center">
        <h3 className="text-xl font-bold mb-4">Rejoignez la Révolution Financière Décentralisée</h3>
        <p className="text-gray-300 mb-6">
          Veegox représente la prochaine génération de services financiers, combinant le meilleur de la DeFi et de l'IA
          pour créer un écosystème ouvert, équitable et accessible à tous.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-veegox-purple hover:bg-veegox-deep-purple">
            <Link to="/contact">Contactez l'équipe</Link>
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Link to="/testnet-config" className="flex items-center">
              Configurer sur Testnet <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperConclusion;
