
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowUpRight, PieChart, Lock, CreditCard } from "lucide-react";

const Tokens = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Tokens Veegox</h1>
          <p className="text-gray-400 mb-8">Découvrez notre architecture multi-token conçue pour optimiser l'écosystème Veegox</p>
          
          {/* Main Token Section - VEX */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-veegox-gradient flex-shrink-0 mr-4"></div>
                  <div>
                    <h2 className="text-2xl font-bold">VEX</h2>
                    <p className="text-gray-400">Token Principal Utilitaire</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Le VEX est le token central de l'écosystème Veegox, utilisé pour les frais de transaction, la gouvernance et 
                  le staking. Il alimente toutes les fonctionnalités de la plateforme et constitue la base de notre modèle économique.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-veegox-dark-bg p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Offre totale</div>
                    <div className="font-semibold">100,000,000 VEX</div>
                  </div>
                  <div className="bg-veegox-dark-bg p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Modèle</div>
                    <div className="font-semibold">Déflationniste</div>
                  </div>
                  <div className="bg-veegox-dark-bg p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Standard</div>
                    <div className="font-semibold">ERC-20</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-veegox-purple" />
                      Utilitaire
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm pl-2">
                      <li>Paiement des frais sur la plateforme</li>
                      <li>Accès aux services premium</li>
                      <li>Collatéral pour prêts</li>
                      <li>Staking pour récompenses</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-veegox-purple" />
                      Mécanismes Économiques
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm pl-2">
                      <li>Rachat et destruction automatique</li>
                      <li>Émission décroissante programmée</li>
                      <li>Partage des revenus avec stakers</li>
                      <li>Incitations de liquidité</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-veegox-dark-bg rounded-lg p-6">
                <div className="bg-veegox-card-bg rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">Metrics VEX</div>
                    <a href="#" className="text-xs text-veegox-purple flex items-center hover:underline">
                      Explorer <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prix estimé:</span>
                      <span>2.45 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap Initial:</span>
                      <span>24.5M USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Offre en Circulation:</span>
                      <span>10,000,000 VEX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staked:</span>
                      <span>--</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Distribution Initiale</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vente publique</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Trésorerie DAO</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Équipe & Conseillers</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Écosystème & Partenariats</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Tokens - sVEX and gVEX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* sVEX */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex-shrink-0 mr-4"></div>
                <div>
                  <h2 className="text-2xl font-bold">sVEX</h2>
                  <p className="text-gray-400">Token Stable d'Épargne</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Le sVEX est un stablecoin indexé sur l'USDC (1:1) utilisé pour l'épargne à rendement fixe dans l'écosystème.
                Il offre une protection contre la volatilité du marché tout en permettant l'accès aux services financiers Veegox.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-veegox-dark-bg p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Émission</div>
                  <div className="font-semibold">Dynamique (collatéralisée)</div>
                </div>
                <div className="bg-veegox-dark-bg p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Indexation</div>
                  <div className="font-semibold">1:1 avec USDC</div>
                </div>
              </div>
              <h3 className="font-semibold mb-2 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                Caractéristiques
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm pl-2 mb-6">
                <li>Indexé sur l'USDC (1:1)</li>
                <li>Utilisé pour l'épargne à rendement fixe</li>
                <li>Protection contre la volatilité du marché</li>
                <li>Processus de frappe et rachat transparent</li>
              </ul>
              <div className="bg-veegox-card-bg rounded-lg p-4">
                <h4 className="font-semibold mb-2">Mécanisme de Stabilité</h4>
                <p className="text-gray-300 text-sm">
                  Le sVEX maintient sa parité avec l'USDC grâce à un algorithme de stabilité et un collatéral surgaranti. 
                  Le protocole surveille constamment la parité et ajuste l'offre en circulation pour maintenir la stabilité.
                </p>
              </div>
            </div>
            
            {/* gVEX */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex-shrink-0 mr-4"></div>
                <div>
                  <h2 className="text-2xl font-bold">gVEX</h2>
                  <p className="text-gray-400">Token de Gouvernance</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Le gVEX est le token de gouvernance de Veegox, obtenu en verrouillant des tokens VEX. Il donne droit de vote 
                dans la DAO proportionnellement à la quantité détenue et à la durée de verrouillage choisie.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-veegox-dark-bg p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Modèle</div>
                  <div className="font-semibold">Non-transférable</div>
                </div>
                <div className="bg-veegox-dark-bg p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Obtention</div>
                  <div className="font-semibold">Staking verrouillé</div>
                </div>
              </div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-purple-500" />
                Caractéristiques
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm pl-2 mb-6">
                <li>Obtenu via le staking verrouillé de VEX</li>
                <li>Donne des droits de vote dans la DAO</li>
                <li>Permet de soumettre des propositions</li>
                <li>Durée de verrouillage = poids de vote augmenté</li>
              </ul>
              <div className="bg-veegox-card-bg rounded-lg p-4">
                <h4 className="font-semibold mb-2">Multiplicateurs de Vote</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>1 mois de lock</span>
                    <span className="font-semibold">x1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>6 mois de lock</span>
                    <span className="font-semibold">x2.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>12 mois de lock</span>
                    <span className="font-semibold">x5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>24 mois de lock</span>
                    <span className="font-semibold">x10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Economics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Économie des Tokens</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-veegox-card-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Flux Économiques</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Génération de Revenus</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                      <li>Frais de plateforme (0.1% - 0.5% par transaction)</li>
                      <li>Frais de prêts (répartis entre prêteurs et protocole)</li>
                      <li>Frais de gestion sur investissement IA (1% annuel)</li>
                      <li>Frais d'exécution pour actions automatisées</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Distribution des Frais</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                      <li>30% - Rachat et destruction (déflationniste)</li>
                      <li>40% - Récompenses de staking</li>
                      <li>30% - Trésorerie de la DAO</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mécanismes Incitatifs</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                      <li>Récompenses accrues pour le staking à long terme</li>
                      <li>Bonus pour l'utilisation multi-produits</li>
                      <li>Réductions de frais pour les détenteurs de VEX</li>
                      <li>Programme de référence avec partage des frais</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-veegox-card-bg p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Calendrier de Vesting</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Seed & Private Sale</span>
                        <span>36 mois (6 mois cliff)</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Équipe</span>
                        <span>36 mois (12 mois cliff)</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conseillers</span>
                        <span>24 mois (6 mois cliff)</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vente publique</span>
                        <span>Libération immédiate</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-veegox-purple h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-veegox-card-bg p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Objectifs Tokenomics</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="bg-veegox-purple/20 text-veegox-purple w-6 h-6 flex items-center justify-center rounded-full font-medium mr-3 flex-shrink-0">1</span>
                      <span>Alignement des intérêts entre utilisateurs, développeurs et investisseurs</span>
                    </li>
                    <li className="flex">
                      <span className="bg-veegox-purple/20 text-veegox-purple w-6 h-6 flex items-center justify-center rounded-full font-medium mr-3 flex-shrink-0">2</span>
                      <span>Modèle déflationniste à long terme pour préserver la valeur</span>
                    </li>
                    <li className="flex">
                      <span className="bg-veegox-purple/20 text-veegox-purple w-6 h-6 flex items-center justify-center rounded-full font-medium mr-3 flex-shrink-0">3</span>
                      <span>Incitations pour le staking et la participation à long terme</span>
                    </li>
                    <li className="flex">
                      <span className="bg-veegox-purple/20 text-veegox-purple w-6 h-6 flex items-center justify-center rounded-full font-medium mr-3 flex-shrink-0">4</span>
                      <span>Distribution équitable et progressive pour éviter la centralisation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Info & Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Informations Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Contrats VEX</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Ethereum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0x123...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Polygon (Mumbai testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0x456...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Arbitrum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0x789...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Contrats sVEX</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Ethereum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xabc...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Polygon (Mumbai testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xdef...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Arbitrum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xghi...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Contrats gVEX</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Ethereum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xjkl...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Polygon (Mumbai testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xmno...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Arbitrum (Goerli testnet)</div>
                    <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                      <div className="text-sm font-mono text-gray-300 truncate flex-grow">0xpqr...Exemple</div>
                      <button className="text-veegox-purple hover:text-veegox-blue ml-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
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

export default Tokens;
