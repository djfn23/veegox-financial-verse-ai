
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PiggyBank, LineChart, Lock, AlertTriangle } from "lucide-react";

const Savings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Épargne & Staking</h1>
          <p className="text-gray-400 mb-8">Faites fructifier vos actifs cryptographiques avec nos solutions d'épargne et de staking</p>
          
          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-300">
              Cette fonctionnalité sera disponible prochainement. Nous travaillons actuellement sur le déploiement des contrats intelligents.
            </p>
          </div>
          
          {/* APY Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-500 mb-2">4.2% APY</div>
              <div className="text-lg font-medium">Épargne sVEX</div>
              <div className="text-sm text-gray-400 mt-1">Stable et sécurisé</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-500 mb-2">8.7% APY</div>
              <div className="text-lg font-medium">Staking Flexible VEX</div>
              <div className="text-sm text-gray-400 mt-1">Variable selon l'activité</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-500 mb-2">14.5% APY</div>
              <div className="text-lg font-medium">Staking Verrouillé gVEX</div>
              <div className="text-sm text-gray-400 mt-1">12 mois de verrouillage</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-500 mb-2">11.3% APY</div>
              <div className="text-lg font-medium">Farming de Liquidité</div>
              <div className="text-sm text-gray-400 mt-1">Pool VEX-ETH</div>
            </div>
          </div>
          
          {/* Savings Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Options d'épargne</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                  <PiggyBank className="h-6 w-6 text-veegox-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Épargne Stable</h3>
                <p className="text-gray-300 mb-4">
                  Déposez des stablecoins ou sVEX pour gagner un rendement fixe avec un risque minimal et une liquidité complète.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Rendement fixe de 3-5% APY</li>
                  <li>• Retrait à tout moment</li>
                  <li>• Idéal pour les investisseurs prudents</li>
                </ul>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-veegox-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Staking Flexible VEX</h3>
                <p className="text-gray-300 mb-4">
                  Bloquez vos tokens VEX pour recevoir des récompenses variables basées sur l'activité de la plateforme, avec la possibilité de retrait à tout moment.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Rendement variable 7-12% APY</li>
                  <li>• Retrait avec 3 jours de délai</li>
                  <li>• Récompenses quotidiennes</li>
                </ul>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-veegox-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Staking Verrouillé gVEX</h3>
                <p className="text-gray-300 mb-4">
                  Bloquez vos VEX sur une période fixe (1-24 mois) pour obtenir des rendements plus élevés et des droits de gouvernance via gVEX.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Jusqu'à 20% APY selon la durée</li>
                  <li>• Droits de vote dans la DAO</li>
                  <li>• Réductions sur les frais de plateforme</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Rewards Simulator */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Simulateur de Récompenses</h2>
            <div className="bg-veegox-gradient p-0.5 rounded-lg">
              <div className="bg-veegox-darker-bg rounded-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Type d'épargne</label>
                      <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                        <option>Épargne Stable sVEX</option>
                        <option>Staking Flexible VEX</option>
                        <option>Staking Verrouillé gVEX</option>
                        <option>Farming de Liquidité</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Montant</label>
                      <input 
                        type="text" 
                        className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                        placeholder="1000"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Période</label>
                      <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                        <option>30 jours</option>
                        <option>90 jours</option>
                        <option>180 jours</option>
                        <option>365 jours</option>
                      </select>
                    </div>
                    <button className="w-full bg-veegox-purple hover:bg-veegox-deep-purple text-white py-2 rounded-md mt-2" disabled>
                      Calculer les Récompenses
                    </button>
                  </div>
                  
                  <div className="bg-veegox-dark-bg p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Résultats Estimés</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Récompense quotidienne:</span>
                        <span className="font-semibold">-- VEX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Récompense mensuelle:</span>
                        <span className="font-semibold">-- VEX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Récompense annuelle:</span>
                        <span className="font-semibold">-- VEX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY réel:</span>
                        <span className="font-semibold text-green-500">--%</span>
                      </div>
                      <div className="border-t border-gray-700 pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Valeur future estimée:</span>
                          <span className="font-semibold">-- VEX</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Strategy Comparison */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Comparer les Stratégies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-veegox-dark-bg rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stratégie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">APY</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Liquidité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risque</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avantages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Épargne Stable</td>
                    <td className="px-6 py-4 whitespace-nowrap">4.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Élevée</td>
                    <td className="px-6 py-4 whitespace-nowrap">Très faible</td>
                    <td className="px-6 py-4 whitespace-nowrap">Sécurité maximale</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Staking Flexible</td>
                    <td className="px-6 py-4 whitespace-nowrap">8.7%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Moyenne</td>
                    <td className="px-6 py-4 whitespace-nowrap">Faible</td>
                    <td className="px-6 py-4 whitespace-nowrap">Équilibre rendement/risque</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Staking Verrouillé</td>
                    <td className="px-6 py-4 whitespace-nowrap">14.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Faible</td>
                    <td className="px-6 py-4 whitespace-nowrap">Moyen</td>
                    <td className="px-6 py-4 whitespace-nowrap">Gouvernance + rendement élevé</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Farming Liquidité</td>
                    <td className="px-6 py-4 whitespace-nowrap">11.3%</td>
                    <td className="px-6 py-4 whitespace-nowrap">Moyenne</td>
                    <td className="px-6 py-4 whitespace-nowrap">Élevé</td>
                    <td className="px-6 py-4 whitespace-nowrap">Double récompense (frais + VEX)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Savings;
