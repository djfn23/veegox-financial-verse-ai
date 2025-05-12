
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MessageSquare, Mail, AlertTriangle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Contactez l'équipe</h1>
          <p className="text-gray-400 mb-8">Nous sommes à votre écoute pour répondre à vos questions et vous accompagner dans l'écosystème Veegox</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="bg-veegox-gradient p-0.5 rounded-lg mb-8">
                <div className="bg-veegox-darker-bg rounded-md p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Envoyez-nous un message
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                      >
                        <option>Question générale</option>
                        <option>Support technique</option>
                        <option>Partenariat</option>
                        <option>Investissement</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full bg-veegox-dark-bg border border-gray-700 rounded-md px-4 py-2"
                        placeholder="Détaillez votre message ici..."
                      ></textarea>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <p className="text-yellow-300 text-sm">
                        Notre formulaire de contact n'est pas encore connecté à notre système de tickets. Pour l'instant, veuillez utiliser l'adresse email.
                      </p>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-veegox-purple hover:bg-veegox-deep-purple text-white py-2 rounded-md"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-veegox-card-bg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Contactez-nous par email
                </h2>
                <p className="text-gray-300 mb-4">
                  Notre équipe est disponible pour répondre à vos questions et vous accompagner dans votre expérience Veegox.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-400">Support général:</div>
                    <div className="text-veegox-purple">contact@veegox.com</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400">Support technique:</div>
                    <div className="text-veegox-purple">support@veegox.com</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400">Partenariats:</div>
                    <div className="text-veegox-purple">partners@veegox.com</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-card-bg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Quand sera lancé Veegox ?</h3>
                    <p className="text-gray-400 text-sm">
                      Veegox suit un calendrier de déploiement progressif, avec des phases de test sur les réseaux testnet prévues pour Q4 2023, et un lancement sur mainnet en Q1 2024.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sur quelles blockchains Veegox sera-t-il disponible ?</h3>
                    <p className="text-gray-400 text-sm">
                      Veegox sera initialement déployé sur Ethereum, puis rapidement sur Polygon, Arbitrum et d'autres L2 pour minimiser les frais de transaction.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Comment participer à la gouvernance de Veegox ?</h3>
                    <p className="text-gray-400 text-sm">
                      Pour participer à la gouvernance, vous devrez détenir des tokens gVEX obtenus en verrouillant des tokens VEX dans le module de staking.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Les contrats ont-ils été audités ?</h3>
                    <p className="text-gray-400 text-sm">
                      Tous nos contrats intelligents feront l'objet d'audits rigoureux par plusieurs firmes de sécurité reconnues avant le déploiement sur mainnet.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-veegox-card-bg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Rejoignez notre communauté</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-3 rounded-md" disabled>
                    Discord
                  </button>
                  <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-3 rounded-md" disabled>
                    Twitter
                  </button>
                  <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-3 rounded-md" disabled>
                    Telegram
                  </button>
                  <button className="w-full bg-veegox-dark-bg hover:bg-veegox-purple/20 text-gray-200 py-3 rounded-md" disabled>
                    Medium
                  </button>
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

export default Contact;
