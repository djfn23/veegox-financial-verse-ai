import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center">
      {isConnected ? (
        <>
          <div className="mb-2 text-sm text-muted-foreground">Wallet connecté :</div>
          <div className="mb-4 font-mono text-primary">{address}</div>
          <button onClick={() => disconnect()} className="btn btn-secondary">Déconnexion</button>
        </>
      ) : (
        <button onClick={() => connect()} className="btn btn-primary">Connecter Metamask</button>
      )}
    </div>
  );
}
