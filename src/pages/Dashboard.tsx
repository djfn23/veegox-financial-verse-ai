import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Coins, PiggyBank, Vote, LineChart, Wallet, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import NetworkAlert from "@/components/network-alert";

const Dashboard = () => {
  const { account, isConnected, connectWallet, isConnecting } = useWeb3();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Tableau de Bord</h1>
              <p className="text-gray-400">Gérez vos actifs et activités dans l'écosystème Veegox</p>
            </div>
            {!isConnected && (
              <div className="mt-4 sm:mt-0">
                <Button 
                  className="bg-veegox-gradient hover:opacity-90 transition-opacity"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connexion..." : "Connecter Wallet"}
                </Button>
              </div>
            )}
          </div>
          
          <NetworkAlert />
          
          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-yellow-300">
                Cette interface de tableau de bord est actuellement en démonstration. Certaines fonctionnalités web3 sont encore en développement.
              </p>
            </div>
          </div>
          
          {!isConnected ? (
            <div className="bg-veegox-card-bg rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-veegox-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-veegox-purple" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Connectez votre wallet</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Pour accéder à votre tableau de bord et gérer vos actifs dans l'écosystème Veegox, 
                veuillez connecter votre wallet Ethereum.
              </p>
              <Button 
                className="bg-veegox-gradient hover:opacity-90 transition-opacity"
                onClick={connectWallet}
                disabled={isConnecting}
                size="lg"
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? "Connexion en cours..." : "Connecter Wallet"}
              </Button>
            </div>
          ) : (
            <>
              {/* Wallet Overview */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Aperçu du Portefeuille</h2>
                <div className="bg-veegox-card-bg rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Adresse</span>
                        <span className="text-sm font-mono">{account}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-veegox-dark-bg rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Valeur Totale</div>
                          <div className="text-xl font-semibold">--</div>
                        </div>
                        <div className="bg-veegox-dark-bg rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Rendement Mensuel</div>
                          <div className="text-xl font-semibold">--</div>
                        </div>
                        <div className="bg-veegox-dark-bg rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Score On-Chain</div>
                          <div className="text-xl font-semibold">--</div>
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">Vos Tokens</h3>
                      <div className="space-y-2">
                        <div className="bg-veegox-dark-bg rounded-lg p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-veegox-purple mr-3"></div>
                            <div>
                              <div className="font-medium">VEX</div>
                              <div className="text-xs text-gray-400">Veegox Token</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>-- VEX</div>
                            <div className="text-xs text-gray-400">≈ -- USD</div>
                          </div>
                        </div>
                        <div className="bg-veegox-dark-bg rounded-lg p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-500 mr-3"></div>
                            <div>
                              <div className="font-medium">sVEX</div>
                              <div className="text-xs text-gray-400">Stable VEX</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>-- sVEX</div>
                            <div className="text-xs text-gray-400">≈ -- USD</div>
                          </div>
                        </div>
                        <div className="bg-veegox-dark-bg rounded-lg p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-600 mr-3"></div>
                            <div>
                              <div className="font-medium">gVEX</div>
                              <div className="text-xs text-gray-400">Governance VEX</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>-- gVEX</div>
                            <div className="text-xs text-gray-400">≈ -- USD</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Actions Rapides</h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Coins className="mr-2 h-4 w-4" />
                          Acheter des tokens
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Wallet className="mr-2 h-4 w-4" />
                          Déposer des actifs
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <PiggyBank className="mr-2 h-4 w-4" />
                          Staking
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Vote className="mr-2 h-4 w-4" />
                          Voter (DAO)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Positions */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Vos Positions Actives</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Lending Position */}
                  <div className="bg-veegox-card-bg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Coins className="h-5 w-5 text-veegox-purple mr-2" />
                        <h3 className="font-semibold">Crédit</h3>
                      </div>
                      <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                        Démo
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Montant emprunté:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Collatéral:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Taux d'intérêt:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Échéance:</span>
                        <span>--</span>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full" variant="outline" size="sm" disabled>
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Savings Position */}
                  <div className="bg-veegox-card-bg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <PiggyBank className="h-5 w-5 text-veegox-purple mr-2" />
                        <h3 className="font-semibold">Épargne</h3>
                      </div>
                      <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                        Démo
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Montant déposé:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Rendement:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Récompenses cumulées:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Type:</span>
                        <span>--</span>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full" variant="outline" size="sm" disabled>
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Investment Position */}
                  <div className="bg-veegox-card-bg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <LineChart className="h-5 w-5 text-veegox-purple mr-2" />
                        <h3 className="font-semibold">Portfolio IA</h3>
                      </div>
                      <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                        Démo
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Valeur du portfolio:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Performance (30j):</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stratégie:</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Allocation:</span>
                        <span>--</span>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full" variant="outline" size="sm" disabled>
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Transactions History */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Historique des Transactions</h2>
                <div className="bg-veegox-card-bg rounded-lg p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Montant</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tx Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 text-center" colSpan={5}>
                            <div className="text-gray-400 py-4">
                              Aucune transaction trouvée pour cette adresse
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
