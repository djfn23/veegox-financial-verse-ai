
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhitepaperSection from "@/components/whitepaper-section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, FileText, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Whitepaper = () => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du whitepaper a été copié dans le presse-papier",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-veegox-dark-bg py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Whitepaper Veegox</h1>
              <p className="text-xl text-gray-400">
                Écosystème Financier Décentralisé Multi-token avec IA
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copier le lien
              </Button>
              <Button className="bg-veegox-gradient flex items-center gap-2">
                <Download className="h-4 w-4" />
                Télécharger le PDF
              </Button>
            </div>
            
            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-veegox-purple animate-bounce" />
            </div>
          </div>
        </div>
        
        {/* Table of Contents */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-veegox-card-bg rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Table des matières</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ol className="list-decimal list-inside space-y-2">
                  <li><a href="#introduction" className="text-veegox-purple hover:text-veegox-blue transition-colors">Introduction</a></li>
                  <li><a href="#vision" className="text-veegox-purple hover:text-veegox-blue transition-colors">Vision et Mission</a></li>
                  <li><a href="#ecosystem" className="text-veegox-purple hover:text-veegox-blue transition-colors">Écosystème Veegox</a></li>
                  <li><a href="#tokens" className="text-veegox-purple hover:text-veegox-blue transition-colors">Tokenomics</a></li>
                  <li><a href="#lending" className="text-veegox-purple hover:text-veegox-blue transition-colors">Crédit Décentralisé</a></li>
                </ol>
              </div>
              <div>
                <ol className="list-decimal list-inside space-y-2" start={6}>
                  <li><a href="#savings" className="text-veegox-purple hover:text-veegox-blue transition-colors">Épargne et Staking</a></li>
                  <li><a href="#governance" className="text-veegox-purple hover:text-veegox-blue transition-colors">Gouvernance DAO</a></li>
                  <li><a href="#ai-investing" className="text-veegox-purple hover:text-veegox-blue transition-colors">Investissement IA</a></li>
                  <li><a href="#roadmap" className="text-veegox-purple hover:text-veegox-blue transition-colors">Feuille de Route</a></li>
                  <li><a href="#team" className="text-veegox-purple hover:text-veegox-blue transition-colors">Équipe et Partenaires</a></li>
                </ol>
              </div>
            </div>
          </div>
          
          {/* Whitepaper Content Sections */}
          <WhitepaperSection
            id="introduction"
            title="1. Introduction"
            content={[
              "Veegox est un écosystème financier décentralisé complet qui vise à révolutionner l'accès aux services financiers traditionnels grâce à la technologie blockchain et l'intelligence artificielle. En combinant les principes de la finance décentralisée (DeFi) avec des algorithmes d'IA avancés, Veegox offre une suite complète de produits financiers accessibles à tous, sans intermédiaires.",
              "Ce whitepaper présente la vision, l'architecture technique et les mécanismes économiques qui sous-tendent l'écosystème Veegox, ainsi que ses différents modules, tokens et fonctionnalités."
            ]}
          />
          
          <WhitepaperSection
            id="vision"
            title="2. Vision et Mission"
            content={[
              "Notre vision est de créer un système financier ouvert, transparent et accessible à tous, indépendamment de leur localisation ou statut économique. Veegox cherche à démocratiser l'accès aux services financiers en éliminant les intermédiaires traditionnels et en permettant aux utilisateurs de contrôler pleinement leurs actifs.",
              "La mission de Veegox est de fournir une plateforme financière complète qui intègre les meilleures pratiques de la DeFi avec des outils avancés pilotés par l'IA, permettant aux utilisateurs de gérer, investir et faire fructifier leurs actifs numériques de manière sécurisée et efficace."
            ]}
            highlights={[
              "Démocratiser l'accès aux services financiers",
              "Éliminer les intermédiaires traditionnels",
              "Combiner DeFi et intelligence artificielle",
              "Créer un écosystème financier complet et interopérable"
            ]}
          />
          
          <WhitepaperSection
            id="ecosystem"
            title="3. Écosystème Veegox"
            content={[
              "L'écosystème Veegox est construit autour de plusieurs modules interconnectés qui offrent une gamme complète de services financiers. Chaque module est conçu pour fonctionner de manière autonome tout en s'intégrant parfaitement avec les autres composants du système.",
              "Au cœur de l'écosystème se trouve notre architecture multi-token qui permet de différencier les utilisations et d'optimiser l'expérience utilisateur pour chaque service financier."
            ]}
            features={[
              {
                title: "Architecture Modulaire",
                description: "Les services Veegox sont organisés en modules indépendants mais interconnectés, permettant une évolution flexible et évolutive de l'écosystème."
              },
              {
                title: "Interopérabilité",
                description: "L'écosystème Veegox est conçu pour s'intégrer avec d'autres protocoles DeFi et chaînes de blocs, maximisant la valeur et les options pour les utilisateurs."
              },
              {
                title: "Sécurité Multicouche",
                description: "Multiples audits de sécurité, mécanismes de protection contre les attaques et protocoles de récupération d'urgence."
              },
              {
                title: "Gouvernance Communautaire",
                description: "L'évolution de l'écosystème est guidée par sa communauté via le mécanisme de gouvernance DAO, assurant une véritable décentralisation."
              }
            ]}
          />
          
          <WhitepaperSection
            id="tokens"
            title="4. Tokenomics"
            content={[
              "L'écosystème Veegox repose sur une architecture multi-token soigneusement conçue pour optimiser les différentes fonctionnalités de la plateforme. Chaque token a un rôle spécifique et des mécanismes économiques distincts."
            ]}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-veegox-dark-bg p-6 rounded-lg border border-veegox-purple/30">
                <h4 className="font-bold text-xl mb-2">VEX</h4>
                <p className="text-sm text-gray-300 mb-4">Token principal utilitaire</p>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                  <li>Utilisé pour les frais sur la plateforme</li>
                  <li>Donne accès aux services premium</li>
                  <li>Peut être staké pour obtenir des récompenses</li>
                  <li>Offre des droits de gouvernance basiques</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span>Offre totale:</span>
                    <span className="font-mono">100,000,000 VEX</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg border border-blue-500/30">
                <h4 className="font-bold text-xl mb-2">sVEX</h4>
                <p className="text-sm text-gray-300 mb-4">Token stable d'épargne</p>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                  <li>Indexé sur l'USDC (1:1)</li>
                  <li>Utilisé pour l'épargne à rendement fixe</li>
                  <li>Protection contre la volatilité du marché</li>
                  <li>Processus de frappe et rachat transparent</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span>Émission:</span>
                    <span className="font-mono">Dynamique (collatéralisée)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-dark-bg p-6 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-xl mb-2">gVEX</h4>
                <p className="text-sm text-gray-300 mb-4">Token de gouvernance</p>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                  <li>Obtenu via le staking verrouillé de VEX</li>
                  <li>Donne des droits de vote dans la DAO</li>
                  <li>Permet de soumettre des propositions</li>
                  <li>Durée de verrouillage = poids de vote augmenté</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span>Modèle:</span>
                    <span className="font-mono">Non-transférable</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h4 className="font-bold text-xl mb-4">Distribution des tokens</h4>
            <div className="bg-veegox-darker-bg p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">Allocation initiale</h5>
                  <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                    <li>Vente publique: 40%</li>
                    <li>Trésorerie DAO: 20%</li>
                    <li>Équipe et conseillers: 15% (bloqués sur 3 ans)</li>
                    <li>Développement écosystème: 15%</li>
                    <li>Marketing et partenariats: 5%</li>
                    <li>Réserve de liquidité: 5%</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Mécanismes économiques</h5>
                  <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
                    <li>Rachat et destruction automatique: 30% des frais</li>
                    <li>Récompenses staking: 40% des frais</li>
                    <li>Trésorerie DAO: 30% des frais</li>
                    <li>Émission décroissante avec halvings programmés</li>
                    <li>Modèle déflationniste à long terme</li>
                  </ul>
                </div>
              </div>
            </div>
          </WhitepaperSection>
          
          <WhitepaperSection
            id="lending"
            title="5. Crédit Décentralisé"
            content={[
              "Le module de crédit décentralisé de Veegox permet aux utilisateurs d'emprunter des actifs en utilisant leurs crypto-monnaies comme garantie, ou d'obtenir des prêts sans garantie grâce à notre système innovant de scoring on-chain.",
              "Tous les prêts sont gérés par des contrats intelligents qui appliquent automatiquement les conditions convenues, sans intervention humaine."
            ]}
            features={[
              {
                title: "Prêts Collatéralisés",
                description: "Empruntez jusqu'à 75% de la valeur de vos actifs bloqués en garantie, avec des taux compétitifs et sans vérification de crédit."
              },
              {
                title: "Scoring On-Chain",
                description: "Notre algorithme analyse l'historique de transactions blockchain pour établir un score de crédit décentralisé, permettant des prêts à garantie réduite."
              },
              {
                title: "Liquidation Automatique",
                description: "Mécanismes de protection contrôlés par contrats intelligents, avec avertissements préalables et options de remboursement partiel."
              },
              {
                title: "Marchés de Prêts Entre Pairs",
                description: "Plateforme permettant aux prêteurs et emprunteurs de négocier directement les conditions de leurs prêts."
              }
            ]}
          />
          
          <WhitepaperSection
            id="savings"
            title="6. Épargne et Staking"
            content={[
              "Le module d'épargne et staking de Veegox offre aux utilisateurs différentes options pour faire fructifier leurs actifs cryptographiques, avec un équilibre entre rendement, risque et liquidité.",
              "Que vous recherchiez des rendements stables avec des stablecoins ou que vous souhaitiez maximiser vos revenus avec des tokens plus volatils, notre module s'adapte à votre profil d'investissement."
            ]}
            features={[
              {
                title: "Épargne Stable",
                description: "Déposez des stablecoins ou sVEX pour gagner un rendement fixe avec un risque minimal et une liquidité complète."
              },
              {
                title: "Staking Flexible VEX",
                description: "Bloquez vos tokens VEX pour recevoir des récompenses variables basées sur l'activité de la plateforme, avec la possibilité de retrait à tout moment."
              },
              {
                title: "Staking Verrouillé gVEX",
                description: "Bloquez vos VEX sur une période fixe (1-24 mois) pour obtenir des rendements plus élevés et des droits de gouvernance via gVEX."
              },
              {
                title: "Farming de Liquidité",
                description: "Fournissez des liquidités dans des pools pour gagner des récompenses supplémentaires en VEX et des frais de trading."
              }
            ]}
          />
          
          <WhitepaperSection
            id="governance"
            title="7. Gouvernance DAO"
            content={[
              "La Veegox DAO est l'organe de gouvernance de l'écosystème, permettant une décentralisation réelle du pouvoir décisionnel. Les détenteurs de tokens gVEX peuvent voter sur les propositions et influencer l'avenir de la plateforme.",
              "Notre modèle de gouvernance est conçu pour être équitable, transparent et résistant aux attaques, tout en permettant une évolution agile de l'écosystème."
            ]}
          >
            <div className="mb-6">
              <h4 className="font-bold text-xl mb-4">Processus de Gouvernance</h4>
              <ol className="list-decimal list-inside space-y-4 ml-4">
                <li className="pl-2">
                  <span className="font-semibold">Soumission de Proposition</span>
                  <p className="text-gray-300 ml-6 mt-1">Les détenteurs de gVEX (min. 100,000 points) peuvent soumettre des propositions formelles pour améliorer l'écosystème.</p>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Phase de Discussion</span>
                  <p className="text-gray-300 ml-6 mt-1">Période de 7 jours où la communauté débat de la proposition et peut suggérer des modifications.</p>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Vote Formel</span>
                  <p className="text-gray-300 ml-6 mt-1">Période de vote de 5 jours où les détenteurs de gVEX votent pour ou contre la proposition.</p>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Mise en Œuvre</span>
                  <p className="text-gray-300 ml-6 mt-1">Si approuvée (>66%), la proposition est implémentée par l'équipe technique ou via des contrats intelligents automatisés.</p>
                </li>
              </ol>
            </div>
            
            <div className="bg-veegox-card-bg p-6 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Domaines de Décision DAO</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Paramètres des produits financiers</li>
                  <li>Allocation des fonds de la trésorerie</li>
                  <li>Mise à niveau des contrats intelligents</li>
                  <li>Intégration de nouvelles chaînes/actifs</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Ajustements de tokenomics</li>
                  <li>Partenariats stratégiques</li>
                  <li>Initiatives de marketing</li>
                  <li>Changements de gouvernance</li>
                </ul>
              </div>
            </div>
          </WhitepaperSection>
          
          <WhitepaperSection
            id="ai-investing"
            title="8. Investissement IA"
            content={[
              "Le module d'investissement piloté par l'IA est l'un des aspects les plus innovants de Veegox. En exploitant des algorithmes d'apprentissage automatique avancés et l'analyse de données blockchain, nous offrons des stratégies d'investissement automatisées adaptées aux préférences individuelles des utilisateurs.",
              "Notre IA analyse continuellement les marchés, détecte les opportunités et ajuste les allocations d'actifs pour optimiser les rendements tout en gérant les risques selon le profil de chaque utilisateur."
            ]}
            features={[
              {
                title: "Profilage de Risque IA",
                description: "Questionnaire intelligent qui évalue la tolérance au risque, les objectifs et l'horizon temporel pour créer un profil personnalisé."
              },
              {
                title: "Stratégies Prédéfinies",
                description: "Options de risque faible, moyen ou élevé avec allocation d'actifs préconfigurée et régulièrement optimisée par l'IA."
              },
              {
                title: "Rééquilibrage Dynamique",
                description: "Ajustement automatique du portefeuille en fonction des conditions du marché et des changements de corrélation entre actifs."
              },
              {
                title: "Analyse Prédictive",
                description: "Utilisation de modèles prédictifs pour anticiper les tendances de marché et ajuster les positions en conséquence."
              }
            ]}
          />
          
          <WhitepaperSection
            id="roadmap"
            title="9. Feuille de Route"
          >
            <div className="space-y-12">
              <div>
                <h4 className="font-bold text-xl mb-4 text-veegox-purple">Phase 1: Fondation (T3 2023 - T1 2024)</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Développement des smart contracts core</li>
                  <li>Audit de sécurité initial</li>
                  <li>Lancement du token VEX</li>
                  <li>Interface utilisateur de base pour le prêt et l'épargne</li>
                  <li>Déploiement testnet et programme de bug bounty</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xl mb-4 text-veegox-blue">Phase 2: Expansion (T2 2024 - T4 2024)</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Lancement des tokens sVEX et gVEX</li>
                  <li>Implémentation du système de scoring on-chain</li>
                  <li>Déploiement du module d'épargne et staking</li>
                  <li>Première version de la DAO de gouvernance</li>
                  <li>Intégration multi-chaînes (Ethereum, Polygon, Arbitrum)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xl mb-4 text-purple-400">Phase 3: Innovation (T1 2025 - T3 2025)</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Lancement du module d'investissement IA</li>
                  <li>Marchés de prêts entre pairs</li>
                  <li>Intégration des NFT comme garantie</li>
                  <li>Expansion vers les chaînes L2 émergentes</li>
                  <li>Programmes de partenariat et d'intégration</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xl mb-4 text-pink-400">Phase 4: Maturité (T4 2025 et au-delà)</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Version 2.0 de l'architecture Veegox</li>
                  <li>Produits financiers avancés (dérivés, options)</li>
                  <li>Décentralisation complète de la gouvernance</li>
                  <li>Outils institutionnels</li>
                  <li>Infrastructure pour projets tiers</li>
                </ul>
              </div>
            </div>
          </WhitepaperSection>
          
          <WhitepaperSection
            id="team"
            title="10. Équipe et Partenaires"
            content={[
              "Veegox est développé par une équipe internationale d'experts en blockchain, finance et intelligence artificielle, unis par la vision d'un système financier plus ouvert et accessible."
            ]}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Les profils d'équipe seraient normalement ici */}
              <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
                </div>
                <h4 className="font-bold">Sophie Martin</h4>
                <p className="text-sm text-veegox-purple">CEO & Founder</p>
                <p className="text-sm text-gray-400 mt-2">15 ans d'expérience en fintech et blockchain</p>
              </div>
              
              <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
                </div>
                <h4 className="font-bold">Marc Dubois</h4>
                <p className="text-sm text-veegox-purple">CTO</p>
                <p className="text-sm text-gray-400 mt-2">Architecte blockchain et expert en sécurité</p>
              </div>
              
              <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-veegox-dark-bg mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-veegox-purple opacity-50" />
                </div>
                <h4 className="font-bold">Aisha Nkosi</h4>
                <p className="text-sm text-veegox-purple">Head of AI</p>
                <p className="text-sm text-gray-400 mt-2">PhD en ML appliqué à la finance</p>
              </div>
            </div>
            
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
          </WhitepaperSection>
          
          {/* Conclusion */}
          <div className="bg-veegox-gradient p-0.5 rounded-lg mb-12">
            <div className="bg-veegox-darker-bg rounded-md p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Rejoignez la Révolution Financière Décentralisée</h3>
              <p className="mb-6">
                Veegox représente la prochaine génération de services financiers, combinant le meilleur de la DeFi et de l'IA
                pour créer un écosystème ouvert, équitable et accessible à tous.
              </p>
              <Button className="bg-veegox-purple hover:bg-veegox-deep-purple">
                <Link to="/contact">Contactez l'équipe</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Whitepaper;
