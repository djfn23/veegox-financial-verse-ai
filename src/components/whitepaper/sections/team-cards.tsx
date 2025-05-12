
import React from "react";
import { FileText } from "lucide-react";

const TeamCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
          <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
        </div>
        <h4 className="font-bold">Sophie Martin</h4>
        <p className="text-sm text-veegox-purple">CEO & Founder</p>
        <p className="text-sm text-gray-400 mt-2">15 ans d'expérience en fintech et blockchain</p>
      </div>
      
      <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
          <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
        </div>
        <h4 className="font-bold">Marc Dubois</h4>
        <p className="text-sm text-veegox-purple">CTO</p>
        <p className="text-sm text-gray-400 mt-2">Architecte blockchain et expert en sécurité</p>
      </div>
      
      <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
          <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
        </div>
        <h4 className="font-bold">Aisha Nkosi</h4>
        <p className="text-sm text-veegox-purple">Head of AI</p>
        <p className="text-sm text-gray-400 mt-2">PhD en ML appliqué à la finance</p>
      </div>
    </div>
  );
};

export default TeamCards;
