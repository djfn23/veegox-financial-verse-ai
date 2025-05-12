
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "Le rôle de l'IA dans l'optimisation des portefeuilles DeFi",
    excerpt: "Comment les algorithmes d'intelligence artificielle révolutionnent la gestion des actifs dans la finance décentralisée.",
    date: "12 mai 2023",
    author: "Sophie Martin",
    image: "bg-gradient-to-br from-veegox-purple/30 to-blue-700/30",
    tags: ["Intelligence Artificielle", "DeFi", "Investissement"]
  };
  
  const posts = [
    {
      title: "Les différents modèles de scoring on-chain",
      excerpt: "Une analyse comparative des différentes approches de scoring on-chain pour les prêts décentralisés.",
      date: "5 mai 2023",
      author: "Marc Dubois",
      image: "bg-gradient-to-br from-blue-600/30 to-cyan-500/30",
      tags: ["Crédit", "On-chain", "Analyse"]
    },
    {
      title: "Comment fonctionne le staking multi-niveaux",
      excerpt: "Guide détaillé sur les mécanismes de staking et les stratégies optimales pour maximiser vos rendements.",
      date: "28 avril 2023",
      author: "Aisha Nkosi",
      image: "bg-gradient-to-br from-purple-600/30 to-pink-500/30",
      tags: ["Staking", "Rendement", "Tokenomics"]
    },
    {
      title: "L'écosystème multi-token: pourquoi est-ce plus efficace?",
      excerpt: "Les avantages d'une architecture à plusieurs tokens pour les plateformes DeFi modernes.",
      date: "21 avril 2023",
      author: "Sophie Martin",
      image: "bg-gradient-to-br from-green-600/30 to-emerald-500/30",
      tags: ["Tokenomics", "Architecture", "DeFi"]
    },
    {
      title: "La gouvernance DAO: défis et meilleures pratiques",
      excerpt: "Comment structurer une DAO efficace tout en maintenant une véritable décentralisation.",
      date: "14 avril 2023",
      author: "Lucas Wang",
      image: "bg-gradient-to-br from-orange-600/30 to-amber-500/30",
      tags: ["Gouvernance", "DAO", "Communauté"]
    },
    {
      title: "Sécurité des contrats intelligents: les leçons des récents hacks",
      excerpt: "Analyse des vulnérabilités exploitées récemment et stratégies pour renforcer la sécurité.",
      date: "7 avril 2023",
      author: "Marc Dubois",
      image: "bg-gradient-to-br from-red-600/30 to-rose-500/30",
      tags: ["Sécurité", "Smart Contracts", "Audit"]
    },
    {
      title: "L'interopérabilité multi-chaînes: vision et défis",
      excerpt: "Comment Veegox prévoit de connecter différentes blockchains pour une expérience utilisateur fluide.",
      date: "31 mars 2023",
      author: "Aisha Nkosi",
      image: "bg-gradient-to-br from-yellow-600/30 to-amber-500/30",
      tags: ["Interopérabilité", "Multi-chaîne", "Infrastructure"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Blog Veegox</h1>
          <p className="text-gray-400 mb-8">Actualités, guides et analyses de l'écosystème Veegox et de la DeFi</p>
          
          {/* Featured Post */}
          <div className="bg-veegox-gradient p-0.5 rounded-lg mb-12">
            <div className={`bg-veegox-darker-bg rounded-md p-8 ${featuredPost.image} bg-opacity-10 bg-cover bg-center`}>
              <div className="max-w-3xl">
                <div className="flex items-center space-x-6 text-sm text-gray-300 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-gray-300 text-lg mb-6">{featuredPost.excerpt}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="bg-veegox-purple/20 text-veegox-purple px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a href="#" className="inline-flex items-center text-veegox-purple hover:text-veegox-blue transition-colors group">
                  Lire l'article complet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <div key={index} className="bg-veegox-card-bg rounded-lg overflow-hidden">
                <div className={`h-48 ${post.image} flex items-end p-4`}>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{post.excerpt}</p>
                  
                  <a href="#" className="inline-flex items-center text-veegox-purple hover:text-veegox-blue transition-colors text-sm group">
                    Lire la suite
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Categories & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-veegox-dark-bg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Catégories</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Tokenomics</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">8</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Intelligence Artificielle</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">12</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Gouvernance DAO</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">7</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Crédit Décentralisé</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">9</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Staking & Épargne</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">14</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between hover:text-veegox-purple transition-colors">
                    <span>Sécurité</span>
                    <span className="bg-veegox-card-bg px-2 py-0.5 rounded-full text-xs">6</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-veegox-dark-bg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tags populaires</h2>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  DeFi
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Intelligence Artificielle
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  DAO
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Staking
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  VEX
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Tokenomics
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Crédit
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Sécurité
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Multi-chaîne
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Analyse
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Rendement
                </a>
                <a href="#" className="bg-veegox-card-bg hover:bg-veegox-purple/20 px-3 py-1 rounded-full text-sm transition-colors">
                  Communauté
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

export default Blog;
