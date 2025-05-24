import { useEffect, useState } from 'react';

export default function Explorer() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/network-stats')
      .then((res) => res.json())
      .then(async (stats) => {
        const latest = stats.blockNumber;
        const blockPromises = [];
        for (let i = latest; i > latest - 10 && i >= 0; i--) {
          blockPromises.push(
            fetch(`/api/block/${i}`).then((res) => res.json())
          );
        }
        const blocksData = await Promise.all(blockPromises);
        setBlocks(blocksData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des blocs');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Explorateur de blocs VeegoxChain</h1>
        {loading ? (
          <div className="animate-pulse h-12 w-full bg-muted rounded mb-4" />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full text-sm bg-card shadow rounded">
            <thead>
              <tr className="bg-muted">
                <th className="py-2 px-4">Bloc</th>
                <th className="py-2 px-4">Hash</th>
                <th className="py-2 px-4">Txs</th>
                <th className="py-2 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.number} className="border-t border-muted">
                  <td className="py-2 px-4 font-mono">{block.number}</td>
                  <td className="py-2 px-4 font-mono truncate max-w-[120px]">{block.hash?.slice(0, 12)}...</td>
                  <td className="py-2 px-4">{block.transactions?.length ?? 0}</td>
                  <td className="py-2 px-4">{block.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
