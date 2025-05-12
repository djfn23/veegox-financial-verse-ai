
import React, { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
}

interface WhitepaperSectionProps {
  id: string;
  title: string;
  content?: string[];
  highlights?: string[];
  features?: Feature[];
  children?: ReactNode;
}

const WhitepaperSection: React.FC<WhitepaperSectionProps> = ({
  id,
  title,
  content,
  highlights,
  features,
  children,
}) => {
  return (
    <div id={id} className="mb-16 scroll-mt-20">
      <h3 className="text-2xl font-bold mb-6 text-gradient">{title}</h3>
      
      {/* Main content paragraphs */}
      {content && content.map((paragraph, index) => (
        <p key={index} className="text-gray-300 mb-4">
          {paragraph}
        </p>
      ))}
      
      {/* Highlights section */}
      {highlights && highlights.length > 0 && (
        <div className="bg-veegox-card-bg rounded-lg p-6 my-6">
          <h4 className="font-bold text-xl mb-4">Points clés</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Features grid */}
      {features && features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-veegox-dark-bg p-6 rounded-lg border-l-4 border-veegox-purple"
            >
              <h4 className="font-bold mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Any additional children */}
      {children}
      
      {/* Section divider */}
      <div className="border-b border-gray-700 mt-16"></div>
    </div>
  );
};

export default WhitepaperSection;
