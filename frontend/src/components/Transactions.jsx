import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Transactions() {
  const { address, isConnected } = useAccount();
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setTxs([]);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/transactions/${address}`)
      .then((res) => res.json())
      .then((data) => {
        setTxs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des transactions');
        setLoading(false);
      });
  }, [address, isConnected]);

  if (!isConnected) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">Transactions récentes</h3>
      {loading ? (
        <div className="animate-pulse h-8 w-40 bg-muted rounded" />
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : txs.length === 0 ? (
        <div className="text-muted-foreground text-sm">Aucune transaction trouvée.</div>
      ) : (
        <ul className="divide-y divide-muted">
          {txs.slice(0, 5).map((tx, i) => (
            <li key={tx.hash || i} className="py-2 text-sm">
              <span className="font-mono text-xs">{tx.hash?.slice(0, 10)}... </span>
              <span className="text-muted-foreground">{tx.value} VEX</span>
              <span className="ml-2">{tx.to === address ? '↘️ Reçu' : '↗️ Envoyé'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
