
import React from "react";

interface TokenCardProps {
  name: string;
  description: string;
  features: string[];
  footerLabel: string;
  footerValue: string;
  borderColor: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  name,
  description,
  features,
  footerLabel,
  footerValue,
  borderColor,
}) => {
  return (
    <div className={`bg-veegox-dark-bg p-6 rounded-lg border ${borderColor}`}>
      <h4 className="font-bold text-xl mb-2">{name}</h4>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span>{footerLabel}:</span>
          <span className="font-mono">{footerValue}</span>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
