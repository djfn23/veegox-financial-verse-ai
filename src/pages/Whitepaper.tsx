
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhitepaperSection from "@/components/whitepaper-section";
import { Link } from "react-router-dom";

// Import refactored components
import WhitepaperHero from "@/components/whitepaper/whitepaper-hero";
import TableOfContents from "@/components/whitepaper/table-of-contents";
import WhitepaperConclusion from "@/components/whitepaper/whitepaper-conclusion";
import TokensDistribution from "@/components/whitepaper/sections/tokens-distribution";
import GovernanceProcess from "@/components/whitepaper/sections/governance-process";
import GovernanceDomains from "@/components/whitepaper/sections/governance-domains";
import TeamCards from "@/components/whitepaper/sections/team-cards";
import PartnerLogos from "@/components/whitepaper/sections/partner-logos";
import RoadmapPhases from "@/components/whitepaper/sections/roadmap-phases";

const Whitepaper = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <WhitepaperHero />
        
        {/* Content Section with Table of Contents */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TableOfContents />
          
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
            <TokensDistribution />
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
            <GovernanceProcess />
            <GovernanceDomains />
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
            <RoadmapPhases />
          </WhitepaperSection>
          
          <WhitepaperSection
            id="team"
            title="10. Équipe et Partenaires"
            content={[
              "Veegox est développé par une équipe internationale d'experts en blockchain, finance et intelligence artificielle, unis par la vision d'un système financier plus ouvert et accessible."
            ]}
          >
            <TeamCards />
            <PartnerLogos />
          </WhitepaperSection>
          
          {/* Conclusion */}
          <WhitepaperConclusion />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Whitepaper;
