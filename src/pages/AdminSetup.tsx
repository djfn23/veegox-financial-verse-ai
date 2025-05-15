
import React, { useState } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { AdminSetupService } from "@/services/admin-setup";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert, ShieldCheck, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const { isConnected, account } = useWeb3();
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetupWallet = async () => {
    setLoading(true);
    try {
      const result = await AdminSetupService.setupAdminWallet(
        walletAddress,
        privateKey,
        secretKey
      );
      
      if (result) {
        // Réinitialiser les champs après configuration réussie
        setWalletAddress("");
        setPrivateKey("");
        setSecretKey("");
      }
    } catch (error) {
      console.error("Erreur lors de la configuration:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetupDemo = async () => {
    setLoading(true);
    try {
      await AdminSetupService.setupDemoAdminWallet();
    } catch (error) {
      console.error("Erreur lors de la configuration démo:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la configuration démo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-veegox-card-bg rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-veegox-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="h-8 w-8 text-veegox-purple" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Accès restreint</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Veuillez connecter votre wallet avec un compte administrateur pour accéder à cette page.
              </p>
              <Button className="bg-veegox-gradient hover:opacity-90 transition-opacity">
                Connecter Wallet
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col mb-6">
            <h1 className="text-3xl font-bold mb-1">Configuration Administrateur</h1>
            <p className="text-gray-400">Configurer le wallet administrateur pour les transactions automatisées</p>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Configuration manuelle</h2>
              <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-medium">
                Administrateur uniquement
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="wallet-address">Adresse du wallet administrateur</Label>
                <Input 
                  id="wallet-address" 
                  placeholder="0x..." 
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="private-key" className="flex items-center">
                  <span>Clé privée</span>
                  <span className="ml-2 text-xs text-gray-400">(sera chiffrée avant stockage)</span>
                </Label>
                <div className="relative">
                  <Input 
                    id="private-key" 
                    placeholder="0x..." 
                    type="password"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="font-mono"
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  La clé privée est chiffrée avant d'être stockée en base de données
                </p>
              </div>

              <div>
                <Label htmlFor="secret-key">Clé de chiffrement</Label>
                <Input 
                  id="secret-key" 
                  placeholder="Mot de passe pour chiffrer la clé privée" 
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                <p className="text-xs text-amber-500 mt-1">
                  IMPORTANT: Conservez cette clé, elle sera nécessaire pour déchiffrer la clé privée
                </p>
              </div>

              <Button 
                className="w-full bg-veegox-purple hover:bg-veegox-purple/90" 
                onClick={handleSetupWallet}
                disabled={loading || !walletAddress || !privateKey || !secretKey}
              >
                {loading ? "Configuration en cours..." : "Configurer le wallet administrateur"}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Configuration démo</h2>
              <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-medium">
                Recommandé pour tester
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-veegox-card-bg/50 rounded-lg">
                <ShieldCheck className="h-8 w-8 text-veegox-purple mr-4" />
                <div>
                  <h3 className="font-semibold">Configurer avec l'adresse fournie</h3>
                  <p className="text-sm text-gray-400">
                    Utilise l'adresse 0xA019A17E0fBF77e775C244399ca0689f6EDf6387 avec des paramètres préconfigurés
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-veegox-gradient hover:opacity-90" 
                onClick={handleSetupDemo}
                disabled={loading}
              >
                {loading ? "Configuration en cours..." : "Configurer le wallet démo"}
              </Button>
              
              <p className="text-xs text-gray-400 text-center">
                Note: Cette option utilise des données de démonstration et ne doit pas être utilisée en production
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSetup;
