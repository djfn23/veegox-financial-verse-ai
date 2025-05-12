
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AlertTriangle, Check, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestnetConfig = () => {
  // Simulated wallet connection state
  const [walletConnected, setWalletConnected] = useState(false);
  const [networkSelected, setNetworkSelected] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [deploymentNetwork, setDeploymentNetwork] = useState("");
  
  // Simulated contract addresses
  const contractAddresses = {
    vex: "0x8EF52A39eB761CEB489E61390eAd0918D0F13E13",
    svex: "0x2B52A5e92D84eD73D5C36449dB7e0De2E9A2B9E3",
    gvex: "0x3D67E9A4e35cC2c928F6e19C7e6b25A4A6eF3e52"
  };
  
  const handleConnectWallet = () => {
    setWalletConnected(true);
  };
  
  const handleSelectNetwork = (network: string) => {
    setDeploymentNetwork(network);
    setNetworkSelected(true);
  };
  
  const handleDeploy = () => {
    setDeployed(true);
  };
  
  const [copied, setCopied] = useState({
    vex: false,
    svex: false,
    gvex: false
  });
  
  const copyToClipboard = (text: string, type: 'vex' | 'svex' | 'gvex') => {
    navigator.clipboard.writeText(text);
    
    setCopied(prev => ({ ...prev, [type]: true }));
    
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Configuration Testnet</h1>
          <p className="text-gray-400 mb-8">Déployez et testez les tokens Veegox sur les réseaux de test</p>
          
          {/* Instruction Card */}
          <div className="bg-veegox-gradient p-0.5 rounded-lg mb-8">
            <div className="bg-veegox-darker-bg rounded-md p-6">
              <h2 className="text-xl font-semibold mb-4">Déploiement sur Testnet</h2>
              <p className="text-gray-300 mb-4">
                Cette page vous permet de déployer les contrats des tokens Veegox sur différents réseaux de test pour expérimenter avec l'écosystème avant le lancement sur mainnet.
                Suivez les étapes ci-dessous pour configurer votre environnement de test.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 flex items-center mt-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <p className="text-yellow-300 text-sm">
                  Cette interface est une simulation. Dans un environnement réel, vous pourriez interagir avec MetaMask ou WalletConnect et déployer de véritables contrats sur les testnets.
                </p>
              </div>
            </div>
          </div>
          
          {/* Configuration Steps */}
          <div className="space-y-8 mb-8">
            {/* Step 1: Connect Wallet */}
            <div className="bg-veegox-card-bg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-veegox-purple flex items-center justify-center mr-4">
                  <span className="font-semibold">1</span>
                </div>
                <h3 className="text-lg font-semibold">Connecter un Wallet</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Pour déployer les contrats, vous devez d'abord connecter un wallet compatible avec les réseaux de test.
              </p>
              <div className="flex justify-center">
                {!walletConnected ? (
                  <Button 
                    className="px-8 bg-veegox-purple hover:bg-veegox-deep-purple"
                    onClick={handleConnectWallet}
                  >
                    Connecter Wallet
                  </Button>
                ) : (
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 flex items-center w-full">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-300">
                      Wallet connecté avec succès: 0x7F5...e3D9
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Step 2: Select Network */}
            <div className={`bg-veegox-card-bg rounded-lg p-6 ${!walletConnected && 'opacity-60'}`}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-veegox-purple flex items-center justify-center mr-4">
                  <span className="font-semibold">2</span>
                </div>
                <h3 className="text-lg font-semibold">Sélectionner le Réseau</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Choisissez le réseau de test sur lequel vous souhaitez déployer les tokens Veegox.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <Button 
                  variant="outline" 
                  className={`${deploymentNetwork === 'goerli' && 'bg-veegox-purple/20 border-veegox-purple'}`}
                  disabled={!walletConnected}
                  onClick={() => handleSelectNetwork('goerli')}
                >
                  Ethereum Goerli
                </Button>
                <Button 
                  variant="outline" 
                  className={`${deploymentNetwork === 'mumbai' && 'bg-veegox-purple/20 border-veegox-purple'}`}
                  disabled={!walletConnected}
                  onClick={() => handleSelectNetwork('mumbai')}
                >
                  Polygon Mumbai
                </Button>
                <Button 
                  variant="outline" 
                  className={`${deploymentNetwork === 'arbitrum' && 'bg-veegox-purple/20 border-veegox-purple'}`}
                  disabled={!walletConnected}
                  onClick={() => handleSelectNetwork('arbitrum')}
                >
                  Arbitrum Goerli
                </Button>
              </div>
              {networkSelected && (
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-300">
                    Réseau {deploymentNetwork} sélectionné. Assurez-vous d'avoir des tokens de test pour couvrir les frais de déploiement.
                  </p>
                </div>
              )}
            </div>
            
            {/* Step 3: Deploy Tokens */}
            <div className={`bg-veegox-card-bg rounded-lg p-6 ${!networkSelected && 'opacity-60'}`}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-veegox-purple flex items-center justify-center mr-4">
                  <span className="font-semibold">3</span>
                </div>
                <h3 className="text-lg font-semibold">Déployer les Tokens</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Déployez les trois tokens principaux de l'écosystème Veegox: VEX, sVEX et gVEX.
              </p>
              <div className="flex justify-center mb-6">
                <Button 
                  className="px-8 bg-veegox-purple hover:bg-veegox-deep-purple"
                  disabled={!networkSelected || deployed}
                  onClick={handleDeploy}
                >
                  Déployer les Tokens
                </Button>
              </div>
              
              {deployed && (
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-300">
                      Déploiement réussi sur {deploymentNetwork}! Les adresses des contrats sont disponibles ci-dessous.
                    </p>
                  </div>
                  
                  <div className="bg-veegox-dark-bg p-4 rounded-lg">
                    <h4 className="font-medium mb-4">Adresses des Contrats</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">VEX Token (ERC-20)</div>
                        <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                          <div className="text-sm font-mono text-gray-300 truncate flex-grow">{contractAddresses.vex}</div>
                          <button 
                            className="text-veegox-purple hover:text-veegox-blue ml-2"
                            onClick={() => copyToClipboard(contractAddresses.vex, 'vex')}
                          >
                            {copied.vex ? <CopyCheck className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">sVEX Token (Stable)</div>
                        <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                          <div className="text-sm font-mono text-gray-300 truncate flex-grow">{contractAddresses.svex}</div>
                          <button 
                            className="text-veegox-purple hover:text-veegox-blue ml-2"
                            onClick={() => copyToClipboard(contractAddresses.svex, 'svex')}
                          >
                            {copied.svex ? <CopyCheck className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">gVEX Token (Governance)</div>
                        <div className="bg-veegox-darker-bg p-2 rounded flex items-center">
                          <div className="text-sm font-mono text-gray-300 truncate flex-grow">{contractAddresses.gvex}</div>
                          <button 
                            className="text-veegox-purple hover:text-veegox-blue ml-2"
                            onClick={() => copyToClipboard(contractAddresses.gvex, 'gvex')}
                          >
                            {copied.gvex ? <CopyCheck className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="bg-veegox-card-bg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Ressources Additionnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Explorer vos Tokens</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Après le déploiement, vous pouvez consulter vos tokens sur les explorateurs de blockchain correspondants:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://goerli.etherscan.io/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Etherscan (Goerli)
                    </a>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://mumbai.polygonscan.com/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Polygonscan (Mumbai)
                    </a>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://goerli.arbiscan.io/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Arbiscan (Goerli)
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Obtenir des Tokens de Test</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Pour couvrir les frais de déploiement et de transaction, vous pouvez obtenir des tokens de test gratuits:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://goerlifaucet.com/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Goerli ETH Faucet
                    </a>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://faucet.polygon.technology/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Mumbai MATIC Faucet
                    </a>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-veegox-purple mr-2"></div>
                    <a href="https://faucet.arbitrum.io/" target="_blank" rel="noopener noreferrer" className="text-veegox-purple hover:underline">
                      Arbitrum Goerli ETH Faucet
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestnetConfig;
