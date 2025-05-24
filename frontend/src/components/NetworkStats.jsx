import { useEffect, useState } from 'react';

export default function NetworkStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/network-stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des stats réseau');
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">Statistiques réseau</h3>
      {loading ? (
        <div className="animate-pulse h-8 w-40 bg-muted rounded" />
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-muted rounded p-4 flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Bloc courant</div>
            <div className="font-bold text-xl">{stats.blockNumber}</div>
          </div>
          <div className="bg-muted rounded p-4 flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Gas limit</div>
            <div className="font-bold text-xl">{stats.gasLimit}</div>
          </div>
          <div className="bg-muted rounded p-4 flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Timestamp</div>
            <div className="font-bold text-xl">{stats.timestamp}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
