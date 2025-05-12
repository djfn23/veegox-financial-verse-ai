
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-6">Explorer Veegox</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Écosystème Multi-Token</h2>
              <p className="text-gray-300 mb-4">
                Veegox propose une architecture unique multi-token où chaque token a un rôle 
                et une utilité spécifiques dans l'écosystème. Cette architecture permet d'optimiser 
                chaque aspect de la plateforme, de la gouvernance à l'épargne.
              </p>
            </div>
            
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Nos Tokens</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-veegox-purple mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <span className="font-semibold">VEX</span> - Token principal utilitaire pour frais, gouvernance et staking
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <span className="font-semibold">sVEX</span> - Version stable du token indexée sur l'USDC pour l'épargne
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-500 mr-3 flex-shrink-0 mt-1"></div>
                  <div>
                    <span className="font-semibold">gVEX</span> - Token de gouvernance obtenu par locked staking
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Modules Financiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-veegox-dark-bg p-6 rounded-lg hover:bg-veegox-card-bg transition-colors">
                <h3 className="text-xl font-semibold mb-2">Crédit Décentralisé</h3>
                <p className="text-gray-300">
                  Empruntez avec collatéral ou via notre système de scoring on-chain innovant.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg hover:bg-veegox-card-bg transition-colors">
                <h3 className="text-xl font-semibold mb-2">Épargne & Staking</h3>
                <p className="text-gray-300">
                  Faites fructifier vos actifs avec diverses options de rendement adaptées à votre profil.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg hover:bg-veegox-card-bg transition-colors">
                <h3 className="text-xl font-semibold mb-2">DAO Veegox</h3>
                <p className="text-gray-300">
                  Participez à la gouvernance de la plateforme et influencez son avenir.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg hover:bg-veegox-card-bg transition-colors">
                <h3 className="text-xl font-semibold mb-2">Investissement IA</h3>
                <p className="text-gray-300">
                  Laissez nos algorithmes d'IA gérer automatiquement votre portefeuille.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">En Savoir Plus</h2>
            <div className="bg-veegox-gradient p-0.5 rounded-lg">
              <div className="bg-veegox-darker-bg rounded-md p-6">
                <p className="text-gray-300 mb-4">
                  Découvrez notre whitepaper complet pour comprendre la vision, l'architecture technique
                  et les mécanismes économiques de l'écosystème Veegox.
                </p>
                <a 
                  href="/whitepaper" 
                  className="inline-block px-6 py-2 bg-veegox-purple hover:bg-veegox-deep-purple rounded-md"
                >
                  Lire le Whitepaper
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
