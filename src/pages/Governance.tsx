
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Vote, Users, FileText, AlertTriangle } from "lucide-react";

const Governance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Gouvernance DAO</h1>
          <p className="text-gray-400 mb-8">Participez aux décisions qui façonnent l'avenir de l'écosystème Veegox</p>
          
          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-300">
              La Veegox DAO sera lancée après la phase initiale de déploiement. Vous pourrez bientôt participer à la gouvernance.
            </p>
          </div>
          
          {/* DAO Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold mb-2">--</div>
              <div className="text-sm text-gray-400">Propositions actives</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold mb-2">--</div>
              <div className="text-sm text-gray-400">gVEX en staking</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold mb-2">--</div>
              <div className="text-sm text-gray-400">Participants à la DAO</div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
              <div className="text-2xl font-bold mb-2">--</div>
              <div className="text-sm text-gray-400">Propositions acceptées</div>
            </div>
          </div>
          
          {/* Governance Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Processus de Gouvernance</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Soumission</h3>
                <p className="text-gray-400">
                  Les détenteurs de gVEX (min. 100,000 points) peuvent soumettre des propositions formelles pour améliorer l'écosystème.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Discussion</h3>
                <p className="text-gray-400">
                  Période de 7 jours où la communauté débat de la proposition et peut suggérer des modifications.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Vote</h3>
                <p className="text-gray-400">
                  Période de vote de 5 jours où les détenteurs de gVEX votent pour ou contre la proposition.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Mise en Œuvre</h3>
                <p className="text-gray-400">
                  Si approuvée ({`>`}66%), la proposition est implémentée par l'équipe technique ou via des contrats intelligents automatisés.
                </p>
              </div>
            </div>
          </div>
          
          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                <Vote className="h-6 w-6 text-veegox-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mécanisme de Vote</h3>
              <p className="text-gray-300 mb-4">
                La Veegox DAO utilise un système de vote pondéré où votre influence dépend de la quantité et de la durée de verrouillage de vos tokens gVEX.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verrouillage 1 mois:</span>
                  <span>1x multiplicateur</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verrouillage 6 mois:</span>
                  <span>2.5x multiplicateur</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verrouillage 12 mois:</span>
                  <span>5x multiplicateur</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verrouillage 24 mois:</span>
                  <span>10x multiplicateur</span>
                </div>
              </div>
            </div>
            
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-veegox-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Domaines de Décision</h3>
              <p className="text-gray-300 mb-4">
                La DAO gouverne tous les aspects clés de l'écosystème Veegox, garantissant une véritable décentralisation du pouvoir décisionnel.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Paramètres des produits</li>
                  <li>• Allocation des fonds</li>
                  <li>• Mises à niveau techniques</li>
                  <li>• Intégration de nouvelles chaînes</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Ajustements de tokenomics</li>
                  <li>• Partenariats stratégiques</li>
                  <li>• Initiatives marketing</li>
                  <li>• Changements de gouvernance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-veegox-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté Veegox</h3>
              <p className="text-gray-300 mb-4">
                Rejoignez une communauté dynamique de passionnés de DeFi et contribuez à façonner l'avenir de la finance décentralisée.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-2 rounded-md flex items-center justify-center" disabled>
                  <span className="mr-2">Forum Veegox</span>
                  <span className="text-xs bg-veegox-purple px-2 py-0.5 rounded">Bientôt</span>
                </button>
                <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-2 rounded-md flex items-center justify-center" disabled>
                  <span className="mr-2">Discord</span>
                  <span className="text-xs bg-veegox-purple px-2 py-0.5 rounded">Bientôt</span>
                </button>
                <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-2 rounded-md flex items-center justify-center" disabled>
                  <span className="mr-2">Appels Communautaires</span>
                  <span className="text-xs bg-veegox-purple px-2 py-0.5 rounded">Bientôt</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent Proposals Mockup */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Propositions Récentes</h2>
            <div className="bg-veegox-dark-bg rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">Les propositions de gouvernance seront affichées ici</p>
                <p className="text-sm text-gray-500">La Veegox DAO sera lancée à la phase 2 du roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Governance;
