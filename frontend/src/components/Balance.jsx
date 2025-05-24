import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Balance() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setBalance(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/balance/${address}`)
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.balance);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération du solde');
        setLoading(false);
      });
  }, [address, isConnected]);

  if (!isConnected) return null;

  return (
    <div className="flex flex-col items-center my-4">
      <div className="text-lg text-muted-foreground mb-1">Solde VEX</div>
      {loading ? (
        <div className="animate-pulse h-6 w-32 bg-muted rounded" />
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="text-2xl font-bold text-primary">
          {balance ?? '--'} VEX
        </div>
      )}
    </div>
  );
}
