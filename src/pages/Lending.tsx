
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Coins, Shield, ChevronRight, AlertTriangle } from "lucide-react";

const Lending = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Crédit Décentralisé</h1>
          <p className="text-gray-400 mb-8">Empruntez et prêtez des actifs en toute transparence via notre protocole de crédit décentralisé</p>
          
          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-300">
              Cette fonctionnalité sera disponible prochainement. Nous travaillons actuellement sur le déploiement des contrats intelligents.
            </p>
          </div>
          
          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-veegox-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prêts avec Collatéral</h3>
              <p className="text-gray-300 mb-4">
                Déposez vos actifs cryptos comme garantie et empruntez jusqu'à 75% de leur valeur, avec des taux 
                compétitifs et sans vérification de crédit traditionnelle.
              </p>
              <ul className="text-gray-400 space-y-2 mb-4">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Taux d'intérêt bas à partir de 3%</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Collatéraux multiples acceptés</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Durées flexibles de 1 à 12 mois</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-veegox-purple/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-veegox-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scoring On-Chain</h3>
              <p className="text-gray-300 mb-4">
                Notre algorithme analyse votre historique de transactions blockchain pour établir un score de crédit 
                décentralisé, ouvrant la voie à des prêts à collatéral réduit.
              </p>
              <ul className="text-gray-400 space-y-2 mb-4">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Analyse comportementale on-chain</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Collatéral réduit jusqu'à 25%</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-veegox-purple" />
                  <span>Confidentialité préservée</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-veegox-gradient p-0.5 rounded-lg">
              <div className="bg-veegox-darker-bg h-full rounded-md p-6">
                <h3 className="text-xl font-semibold mb-4">Simulateur de Prêt</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Montant du prêt</label>
                    <input 
                      type="text" 
                      className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                      placeholder="1000 USDC"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Collatéral</label>
                    <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                      <option>ETH</option>
                      <option>VEX</option>
                      <option>WBTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Durée</label>
                    <select className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2" disabled>
                      <option>30 jours</option>
                      <option>90 jours</option>
                      <option>180 jours</option>
                      <option>365 jours</option>
                    </select>
                  </div>
                  <button className="w-full bg-veegox-purple hover:bg-veegox-deep-purple text-white py-2 rounded-md mt-2" disabled>
                    Simuler
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Comment ça fonctionne</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Déposez votre collatéral</h3>
                <p className="text-gray-400">
                  Connectez votre wallet et déposez vos actifs comme garantie dans notre contrat intelligent.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Empruntez des actifs</h3>
                <p className="text-gray-400">
                  Choisissez le montant et la durée de votre prêt. Les fonds sont versés instantanément dans votre wallet.
                </p>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-veegox-purple/20 flex items-center justify-center mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Remboursez à tout moment</h3>
                <p className="text-gray-400">
                  Remboursez votre prêt à n'importe quel moment avant l'échéance pour récupérer votre collatéral.
                </p>
              </div>
            </div>
          </div>
          
          {/* Risk Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">À propos des risques</h2>
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <p className="text-gray-300 mb-4">
                Les prêts décentralisés comportent des risques inhérents que les utilisateurs doivent comprendre avant d'utiliser le protocole :
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Risque de liquidation si la valeur du collatéral chute sous le ratio minimum requis</li>
                <li>Volatilité des taux d'intérêt en fonction de l'offre et la demande</li>
                <li>Risques techniques liés aux contrats intelligents malgré des audits rigoureux</li>
              </ul>
              <p className="text-gray-300 mt-4">
                Notre protocole est conçu avec des mécanismes de sécurité comme des avertissements de liquidation et des options de remboursement partiel pour minimiser ces risques.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lending;
