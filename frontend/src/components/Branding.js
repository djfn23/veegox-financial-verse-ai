export default function Branding() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <img src="/veegox-logo.svg" alt="VeegoxChain Logo" className="h-16 mb-4" />
      <h1 className="text-4xl font-bold text-primary mb-2">VeegoxChain</h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl">
        La blockchain EVM-compatible rapide, modulaire et prête pour la finance décentralisée et les applications Web3 nouvelle génération.
      </p>
    </div>
  );
}
