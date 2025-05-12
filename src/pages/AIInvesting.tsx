
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LineChart, Cpu, Shield, AlertTriangle } from "lucide-react";

const AIInvesting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Investissement IA</h1>
          <p className="text-gray-400 mb-8">Optimisez votre portefeuille crypto grâce à nos algorithmes d'intelligence artificielle</p>
          
          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-300">
              Cette fonctionnalité sera disponible lors de la phase 3 de notre roadmap. Nos équipes travaillent actuellement sur les algorithmes.
            </p>
          </div>
          
          {/* Hero Section */}
          <div className="bg-veegox-gradient p-0.5 rounded-lg mb-12">
            <div className="bg-veegox-darker-bg rounded-md p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">L'Intelligence Artificielle au Service de Votre Portefeuille</h2>
                <p className="text-gray-300 mb-6">
                  Notre module d'investissement piloté par l'IA analyse des millions de données on-chain et de marché 
                  pour optimiser votre portefeuille crypto selon votre profil de risque et vos objectifs financiers.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <div className="rounded-full bg-veegox-purple/20 p-1 mr-3 mt-1">
                      <Cpu className="h-4 w-4 text-veegox-purple" />
                    </div>
                    <span>Algorithmes adaptatifs qui apprennent de vos préférences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-veegox-purple/20 p-1 mr-3 mt-1">
                      <LineChart className="h-4 w-4 text-veegox-purple" />
                    </div>
                    <span>Analyse prédictive basée sur des millions de données blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-veegox-purple/20 p-1 mr-3 mt-1">
                      <Shield className="h-4 w-4 text-veegox-purple" />
                    </div>
                    <span>Gestion des risques intelligente pour protéger votre capital</span>
                  </li>
                </ul>
              </div>
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-full h-64 bg-veegox-card-bg rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-veegox-purple/30" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-veegox-dark-bg to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Investment Strategies */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Stratégies d'Investissement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Risque Faible</h3>
                <p className="text-gray-300 mb-4">
                  Allocation conservatrice privilégiant la préservation du capital avec une exposition limitée aux actifs volatils.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Stablecoins / sVEX</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Blue-chips (ETH, BTC)</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Tokens protocolaires</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rendement historique:</span>
                    <span className="font-semibold text-blue-400">6-10% APY</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-veegox-purple">Risque Modéré</h3>
                <p className="text-gray-300 mb-4">
                  Équilibre entre croissance et stabilité, avec une diversification accrue et une exposition mesurée aux actifs à fort potentiel.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Stablecoins / sVEX</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Blue-chips (ETH, BTC)</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Tokens DeFi & IA</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rendement historique:</span>
                    <span className="font-semibold text-veegox-purple">12-20% APY</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-pink-500">Risque Élevé</h3>
                <p className="text-gray-300 mb-4">
                  Stratégie axée sur la croissance, avec une exposition significative aux actifs émergents à fort potentiel et innovations blockchain.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Stablecoins / sVEX</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Blue-chips & DeFi</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Innovation & Opportunités</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rendement historique:</span>
                    <span className="font-semibold text-pink-500">25-40% APY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Comment Fonctionne Notre IA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-veegox-card-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Profilage Personnalisé</h3>
                <p className="text-gray-400">
                  L'IA analyse vos préférences, objectifs et tolérance au risque à travers un questionnaire intelligent.
                </p>
              </div>
              
              <div className="bg-veegox-card-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyse de Marché</h3>
                <p className="text-gray-400">
                  Nos algorithmes analysent en temps réel des millions de données on-chain et signaux de marché.
                </p>
              </div>
              
              <div className="bg-veegox-card-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Allocation Optimale</h3>
                <p className="text-gray-400">
                  L'IA génère une allocation d'actifs optimisée selon votre profil et les conditions de marché.
                </p>
              </div>
              
              <div className="bg-veegox-card-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Rééquilibrage Dynamique</h3>
                <p className="text-gray-400">
                  Ajustement automatique et continu du portefeuille pour s'adapter aux évolutions du marché.
                </p>
              </div>
            </div>
          </div>
          
          {/* Portfolio Simulator Mockup */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Simulateur de Portefeuille IA</h2>
            <div className="bg-veegox-darker-bg rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Montant initial</label>
                    <input 
                      type="text" 
                      className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                      placeholder="10,000 USDC"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Profil de risque</label>
                    <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                      <option>Conservateur (risque faible)</option>
                      <option>Équilibré (risque modéré)</option>
                      <option>Croissance (risque élevé)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Horizon d'investissement</label>
                    <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                      <option>Court terme (< 1 an)</option>
                      <option>Moyen terme (1-3 ans)</option>
                      <option>Long terme (> 3 ans)</option>
                    </select>
                  </div>
                  <button className="w-full bg-veegox-purple hover:bg-veegox-deep-purple text-white py-2 rounded-md" disabled>
                    Générer Portefeuille AI
                  </button>
                </div>
                <div className="lg:col-span-2 bg-veegox-card-bg rounded-lg p-6">
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <h3 className="text-xl font-semibold mb-2">Résultats de Simulation</h3>
                    <p className="text-gray-400 text-sm">Cette fonction sera disponible dans la prochaine mise à jour</p>
                  </div>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2">
                        <LineChart className="h-12 w-12 text-veegox-purple/30 mx-auto" />
                      </div>
                      <p className="text-gray-400">La simulation de portefeuille IA sera disponible lors de notre lancement en phase 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIInvesting;
