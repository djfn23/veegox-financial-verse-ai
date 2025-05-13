
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useWeb3 } from "@/context/Web3Context";
import { Button } from "@/components/ui/button";
import ConnectTestnet from "@/components/connect-testnet";

const TestnetConfig = () => {
  const { isConnected } = useWeb3();

  const testnetFaucets = [
    {
      name: "Goerli",
      description: "Testnet Ethereum populaire",
      faucet: "https://goerlifaucet.com/",
      explorer: "https://goerli.etherscan.io/",
    },
    {
      name: "Sepolia",
      description: "Nouveau testnet Ethereum recommandé",
      faucet: "https://sepoliafaucet.com/",
      explorer: "https://sepolia.etherscan.io/",
    },
    {
      name: "Mumbai",
      description: "Testnet Polygon",
      faucet: "https://faucet.polygon.technology/",
      explorer: "https://mumbai.polygonscan.com/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Configuration Testnet</h1>
          <p className="text-gray-400 mb-8">
            Connectez-vous aux réseaux de test pour essayer Veegox sans utiliser de vrais fonds
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-xl font-semibold mb-4">Ajouter des Réseaux de Test</h2>
              <p className="text-gray-300 mb-6">
                Pour utiliser Veegox en testnet, vous devez d'abord ajouter ces réseaux à votre wallet.
                Cliquez sur les boutons ci-dessous pour les ajouter automatiquement à MetaMask.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <ConnectTestnet network="goerli" />
                  <ConnectTestnet network="sepolia" />
                  <ConnectTestnet network="mumbai" />
                </div>
              </div>
            </div>
            
            <div className="bg-veegox-card-bg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Obtenir des Tokens de Test</h2>
              <p className="text-gray-300 mb-4">
                Une fois connecté à un réseau de test, vous aurez besoin de tokens pour tester les fonctionnalités.
                Utilisez les faucets ci-dessous pour obtenir des tokens gratuits:
              </p>
              
              <div className="space-y-4">
                {testnetFaucets.map((faucet) => (
                  <div key={faucet.name} className="bg-veegox-dark-bg p-4 rounded-lg">
                    <h3 className="font-medium mb-1">{faucet.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{faucet.description}</p>
                    <div className="flex space-x-2">
                      <a 
                        href={faucet.faucet} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button size="sm" variant="default" className="bg-veegox-purple hover:bg-veegox-deep-purple">
                          Faucet
                        </Button>
                      </a>
                      <a 
                        href={faucet.explorer} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button size="sm" variant="outline">
                          Explorer
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-veegox-gradient p-0.5 rounded-lg">
            <div className="bg-veegox-darker-bg rounded-md p-6">
              <h2 className="text-xl font-semibold mb-4">Prochaines étapes</h2>
              <p className="text-gray-300 mb-4">
                Après avoir connecté votre wallet à un réseau de test et obtenu des tokens, vous pouvez:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Explorer le Dashboard pour voir vos tokens et positions</li>
                <li>Tester les différents produits financiers de Veegox</li>
                <li>Participer à la gouvernance DAO avec des tokens de test</li>
                <li>Essayer le module d'investissement IA</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestnetConfig;
