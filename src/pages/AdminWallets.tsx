
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { AdminTransactionService, AdminWalletInfo } from "@/services/admin-transaction-service";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Wallet, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminWallets = () => {
  const { isConnected, account } = useWeb3();
  const [wallets, setWallets] = useState<AdminWalletInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isConnected) {
      loadWallets();
    }
  }, [isConnected]);

  const loadWallets = async () => {
    setLoading(true);
    try {
      const walletData = await AdminTransactionService.getActiveWallets();
      setWallets(walletData);
    } catch (error) {
      console.error("Erreur lors du chargement des wallets:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les wallets administrateurs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Jamais utilisé";
    return new Date(dateStr).toLocaleString();
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-veegox-card-bg rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-veegox-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-veegox-purple" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Wallets Administrateurs</h1>
              <p className="text-gray-400">Gérez les wallets utilisés pour les transactions automatisées</p>
            </div>
            
            <Button variant="outline" onClick={loadWallets} disabled={loading} className="mt-4 md:mt-0">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? "Chargement..." : "Actualiser"}
            </Button>
          </div>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Wallets Actifs</h2>
            {wallets.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Limite quotidienne</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Dernière utilisation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wallets.map((wallet) => (
                    <TableRow key={wallet.id}>
                      <TableCell className="font-mono">{formatWalletAddress(wallet.walletAddress)}</TableCell>
                      <TableCell>{wallet.dailyLimit} tokens</TableCell>
                      <TableCell>{wallet.transactionCount}</TableCell>
                      <TableCell>{formatDate(wallet.lastUsed)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Détails</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin mb-4" />
                    <p>Chargement des wallets...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Wallet className="h-10 w-10 text-gray-400 mb-4" />
                    <p>Aucun wallet administrateur n'a été configuré</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Veuillez contacter l'administrateur système pour configurer un wallet
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Sécurisée</h2>
            <p className="mb-4 text-gray-400">
              Les wallets administrateurs sont configurés par l'équipe technique via des méthodes sécurisées.
              Pour des raisons de sécurité, les clés privées ne peuvent pas être ajoutées via cette interface.
            </p>

            {/* Ceci est simplement un exemple d'interface et non une implémentation fonctionnelle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <Label htmlFor="wallet-address">Adresse du wallet</Label>
                <Input id="wallet-address" placeholder="0x..." disabled />
              </div>
              <div>
                <Label htmlFor="daily-limit">Limite quotidienne</Label>
                <Input id="daily-limit" placeholder="1000" disabled />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Wallet principal pour les paiements automatisés..." disabled />
              </div>
              <div className="md:col-span-2">
                <Button className="bg-gray-600 hover:bg-gray-700 cursor-not-allowed" disabled>
                  <Lock className="mr-2 h-4 w-4" />
                  Ajouter un wallet (Désactivé)
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminWallets;
