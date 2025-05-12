
const CryptoTicker = () => {
  // Mock crypto data
  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "$64,235.79", change: "+2.4%" },
    { name: "Ethereum", symbol: "ETH", price: "$3,487.12", change: "+1.8%" },
    { name: "Veegox", symbol: "VEX", price: "$2.45", change: "+4.2%" },
    { name: "stableVEX", symbol: "sVEX", price: "$1.00", change: "0.0%" },
    { name: "governanceVEX", symbol: "gVEX", price: "$3.75", change: "+2.8%" },
    { name: "Solana", symbol: "SOL", price: "$142.65", change: "+3.1%" },
    { name: "Cardano", symbol: "ADA", price: "$0.58", change: "+0.7%" },
    { name: "BNB", symbol: "BNB", price: "$604.32", change: "+1.2%" },
  ];

  return (
    <div className="bg-veegox-darker-bg border-y border-veegox-dark-bg py-3 overflow-hidden">
      <div className="ticker-container relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {cryptoData.map((crypto, index) => (
            <div key={index} className="mx-8 flex items-center">
              <span className="font-semibold mr-2">{crypto.name} ({crypto.symbol}):</span>
              <span>{crypto.price}</span>
              <span className="text-green-500 ml-1">{crypto.change}</span>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {cryptoData.map((crypto, index) => (
            <div key={`duplicate-${index}`} className="mx-8 flex items-center">
              <span className="font-semibold mr-2">{crypto.name} ({crypto.symbol}):</span>
              <span>{crypto.price}</span>
              <span className="text-green-500 ml-1">{crypto.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;

// Add this to your global CSS (src/index.css)
// @keyframes marquee {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// }

// .animate-marquee {
//   animation: marquee 30s linear infinite;
// }
