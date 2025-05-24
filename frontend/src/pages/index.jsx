import Branding from '../components/Branding';
import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Branding />
      {/* Dashboard et connexion Metamask viendront ici */}
      <div className="flex flex-col items-center mt-8">
        <div className="rounded-lg shadow-lg bg-card p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard VeegoxChain</h2>
          <p className="text-center text-muted-foreground mb-6">
            Connectez votre wallet Metamask pour accéder à vos soldes, transactions et statistiques réseau en temps réel.
          </p>
          <WalletConnect />
          <Balance />
          <Transactions />
          <NetworkStats />
        </div>
      </div>
    </main>
  );
}
