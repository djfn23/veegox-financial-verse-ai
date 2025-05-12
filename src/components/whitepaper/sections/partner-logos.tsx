
import React from "react";

const PartnerLogos: React.FC = () => {
  return (
    <>
      <h4 className="font-bold text-xl mb-4">Partenaires Stratégiques</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-veegox-dark-bg p-4 rounded-lg flex items-center justify-center h-24">
          <span className="text-gray-400 text-lg">Moralis</span>
        </div>
        <div className="bg-veegox-dark-bg p-4 rounded-lg flex items-center justify-center h-24">
          <span className="text-gray-400 text-lg">ChainLink</span>
        </div>
        <div className="bg-veegox-dark-bg p-4 rounded-lg flex items-center justify-center h-24">
          <span className="text-gray-400 text-lg">Arbitrum</span>
        </div>
        <div className="bg-veegox-dark-bg p-4 rounded-lg flex items-center justify-center h-24">
          <span className="text-gray-400 text-lg">Polygon</span>
        </div>
      </div>
    </>
  );
};

export default PartnerLogos;
