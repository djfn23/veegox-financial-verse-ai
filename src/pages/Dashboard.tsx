
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import NetworkAlert from "@/components/network-alert";
import { useVeegoxData } from "@/hooks/use-veegox-data";
import UserProfileSection from "@/components/dashboard/user-profile-section";
import TokenBalancesSection from "@/components/dashboard/token-balances-section";
import TransactionsSection from "@/components/dashboard/transactions-section";
import PositionsSection from "@/components/dashboard/positions-section";
import ActionsPanel from "@/components/dashboard/actions-panel";
import NetworkStats from "@/components/dashboard/network-stats";

const Dashboard = () => {
  const { account, isConnected, connectWallet, isConnecting } = useWeb3();
  const { 
    isLoading, 
    tokenPrices, 
    portfolio, 
    transactions, 
    userProfile, 
    refreshData 
  } = useVeegoxData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Tableau de Bord</h1>
              <p className="text-gray-400">Gérez vos actifs et activités dans l'écosystème Veegox</p>
            </div>
            
            {!isConnected ? (
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
            ) : (
              <div className="mt-4 sm:mt-0">
                <Button 
                  variant="outline" 
                  onClick={() => refreshData()}
                  disabled={isLoading}
                  className="flex items-center"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? "Actualisation..." : "Actualiser"}
                </Button>
              </div>
            )}
          </div>
          
          <NetworkAlert />
          
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
              {/* Stats réseau */}
              <div className="mb-6">
                <NetworkStats isConnected={isConnected} />
              </div>
            
              {/* Profil utilisateur */}
              <div className="mb-6">
                <UserProfileSection profile={userProfile} isLoading={isLoading} />
              </div>
              
              {/* Contenu principal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  {/* Balances de tokens */}
                  <div className="mb-6">
                    <TokenBalancesSection 
                      balances={portfolio?.balances || []} 
                      tokenPrices={tokenPrices}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
                
                <div>
                  {/* Panel d'actions */}
                  <ActionsPanel isConnected={isConnected} />
                </div>
              </div>
              
              {/* Positions actives */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Vos Positions Actives</h2>
                <PositionsSection 
                  staking={portfolio?.staking || []}
                  lending={portfolio?.lending || []}
                  aiPortfolio={portfolio?.ai_portfolio}
                  isLoading={isLoading}
                />
              </div>
              
              {/* Transactions */}
              <TransactionsSection 
                transactions={transactions} 
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
