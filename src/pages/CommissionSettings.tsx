
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { CommissionService, CommissionSetting, CommissionReport } from "@/services/commission-service";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PieChart, 
  LineChart, 
  Line, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Settings, Lock, RefreshCw, LineChart as LineChartIcon, PieChartIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CommissionSettings = () => {
  const { isConnected, account } = useWeb3();
  const [settings, setSettings] = useState<CommissionSetting[]>([]);
  const [reports, setReports] = useState<CommissionReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);

  // État pour l'ajout d'un nouveau paramètre
  const [newSetting, setNewSetting] = useState({
    token_symbol: '',
    tx_type: '',
    percentage: 0.5,
    min_amount: 0,
    max_amount: null as number | null,
    is_active: true
  });

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  useEffect(() => {
    if (isConnected) {
      loadSettings();
      loadReports();
    }
  }, [isConnected]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await CommissionService.getCommissionSettings();
      setSettings(data);
    } catch (error) {
      console.error("Erreur lors du chargement des paramètres:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres de commission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    setReportLoading(true);
    try {
      // Récupérer les rapports des 30 derniers jours
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const data = await CommissionService.getCommissionReports(
        thirtyDaysAgo.toISOString()
      );
      setReports(data);
    } catch (error) {
      console.error("Erreur lors du chargement des rapports:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les rapports de commission",
        variant: "destructive",
      });
    } finally {
      setReportLoading(false);
    }
  };

  const handleToggleActive = async (setting: CommissionSetting) => {
    const success = await CommissionService.updateCommissionSetting(
      setting.id,
      { is_active: !setting.is_active }
    );
    
    if (success) {
      setSettings(settings.map(s => 
        s.id === setting.id ? { ...s, is_active: !s.is_active } : s
      ));
    }
  };

  const handleUpdateSetting = async (id: string, field: string, value: any) => {
    // Valider les valeurs numériques
    if (['percentage', 'min_amount', 'max_amount'].includes(field)) {
      if (isNaN(parseFloat(value)) && value !== null && value !== '') {
        toast({
          title: "Valeur invalide",
          description: "Veuillez saisir un nombre valide",
          variant: "destructive",
        });
        return;
      }
      
      if (field === 'percentage' && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
        toast({
          title: "Pourcentage invalide",
          description: "Le pourcentage doit être compris entre 0 et 100",
          variant: "destructive",
        });
        return;
      }
      
      // Convertir en nombre ou null
      if (value === '') {
        value = null;
      } else if (value !== null) {
        value = parseFloat(value);
      }
    }
    
    const success = await CommissionService.updateCommissionSetting(id, { [field]: value });
    
    if (success) {
      setSettings(settings.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      ));
    }
  };

  const handleAddSetting = async () => {
    // Validation
    if (!newSetting.token_symbol || !newSetting.tx_type) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez saisir le symbole du token et le type de transaction",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(parseFloat(newSetting.percentage.toString())) || 
        parseFloat(newSetting.percentage.toString()) < 0 || 
        parseFloat(newSetting.percentage.toString()) > 100) {
      toast({
        title: "Pourcentage invalide",
        description: "Le pourcentage doit être compris entre 0 et 100",
        variant: "destructive",
      });
      return;
    }
    
    const success = await CommissionService.addCommissionSetting(newSetting);
    
    if (success) {
      // Réinitialiser le formulaire
      setNewSetting({
        token_symbol: '',
        tx_type: '',
        percentage: 0.5,
        min_amount: 0,
        max_amount: null,
        is_active: true
      });
      
      // Recharger les paramètres
      loadSettings();
    }
  };

  // Préparer les données pour les graphiques
  const prepareReportData = () => {
    // Données pour le graphique en camembert (répartition par token)
    const pieData = reports.reduce((acc, report) => {
      const existing = acc.find(item => item.name === report.token_symbol);
      if (existing) {
        existing.value += report.total_commission_amount;
      } else {
        acc.push({
          name: report.token_symbol,
          value: report.total_commission_amount
        });
      }
      return acc;
    }, [] as Array<{ name: string; value: number }>);

    // Données pour le graphique linéaire (évolution par jour)
    const lineData: Array<{ date: string; [key: string]: number }> = [];
    
    reports.forEach(report => {
      const date = new Date(report.period_start).toLocaleDateString();
      const existing = lineData.find(item => item.date === date);
      
      if (existing) {
        if (existing[report.token_symbol]) {
          existing[report.token_symbol] += report.total_commission_amount;
        } else {
          existing[report.token_symbol] = report.total_commission_amount;
        }
      } else {
        const newEntry = { date };
        newEntry[report.token_symbol] = report.total_commission_amount;
        lineData.push(newEntry as any);
      }
    });
    
    // Trier par date
    lineData.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return { pieData, lineData };
  };

  const { pieData, lineData } = reports.length > 0 ? prepareReportData() : { pieData: [], lineData: [] };

  // Obtenir la liste des tokens uniques pour le graphique linéaire
  const uniqueTokens = Array.from(new Set(reports.map(r => r.token_symbol)));

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
              <h1 className="text-3xl font-bold mb-1">Gestion des Commissions</h1>
              <p className="text-gray-400">Configuration et rapports des commissions sur transactions</p>
            </div>
          </div>

          <Tabs defaultValue="settings" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center">
                <LineChartIcon className="h-4 w-4 mr-2" />
                Rapports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Paramètres de Commission</h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin mx-auto mb-4" />
                    <p>Chargement des paramètres...</p>
                  </div>
                ) : settings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Type de Transaction</TableHead>
                          <TableHead>Pourcentage (%)</TableHead>
                          <TableHead>Min. (Token)</TableHead>
                          <TableHead>Max. (Token)</TableHead>
                          <TableHead>Actif</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {settings.map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{setting.token_symbol}</TableCell>
                            <TableCell>{setting.tx_type}</TableCell>
                            <TableCell>
                              <Input 
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={setting.percentage}
                                onChange={(e) => handleUpdateSetting(setting.id, 'percentage', e.target.value)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number"
                                step="0.001"
                                min="0"
                                value={setting.min_amount !== null ? setting.min_amount : ''}
                                placeholder="Aucun"
                                onChange={(e) => handleUpdateSetting(setting.id, 'min_amount', e.target.value)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number"
                                step="0.001"
                                min="0"
                                value={setting.max_amount !== null ? setting.max_amount : ''}
                                placeholder="Aucun"
                                onChange={(e) => handleUpdateSetting(setting.id, 'max_amount', e.target.value)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Switch 
                                checked={setting.is_active} 
                                onCheckedChange={() => handleToggleActive(setting)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <p>Aucun paramètre de commission configuré</p>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Ajouter un Paramètre</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="token_symbol">Symbol du Token</Label>
                    <Input 
                      id="token_symbol"
                      value={newSetting.token_symbol}
                      onChange={(e) => setNewSetting({...newSetting, token_symbol: e.target.value})}
                      placeholder="VEX, ETH, USDC..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tx_type">Type de Transaction</Label>
                    <Input 
                      id="tx_type"
                      value={newSetting.tx_type}
                      onChange={(e) => setNewSetting({...newSetting, tx_type: e.target.value})}
                      placeholder="transfer, stake, withdraw..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="percentage">Pourcentage (%)</Label>
                    <Input 
                      id="percentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={newSetting.percentage}
                      onChange={(e) => setNewSetting({...newSetting, percentage: parseFloat(e.target.value)})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="min_amount">Montant Min. (Token)</Label>
                    <Input 
                      id="min_amount"
                      type="number"
                      step="0.001"
                      min="0"
                      value={newSetting.min_amount || ''}
                      onChange={(e) => setNewSetting({...newSetting, min_amount: e.target.value ? parseFloat(e.target.value) : null})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max_amount">Montant Max. (Token)</Label>
                    <Input 
                      id="max_amount"
                      type="number"
                      step="0.001"
                      min="0"
                      value={newSetting.max_amount || ''}
                      onChange={(e) => setNewSetting({...newSetting, max_amount: e.target.value ? parseFloat(e.target.value) : null})}
                      placeholder="Illimité"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={handleAddSetting} 
                      className="w-full"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Commissions par Token</h2>
                  {reportLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin" />
                    </div>
                  ) : pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => value.toFixed(4)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <PieChartIcon className="h-10 w-10 text-gray-400 mb-4" />
                      <p>Aucune donnée de commission disponible</p>
                    </div>
                  )}
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Évolution des Commissions (30j)</h2>
                  {reportLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin" />
                    </div>
                  ) : lineData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {uniqueTokens.map((token, index) => (
                          <Line
                            key={token}
                            type="monotone"
                            dataKey={token}
                            stroke={COLORS[index % COLORS.length]}
                            dot={{ r: 3 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <LineChartIcon className="h-10 w-10 text-gray-400 mb-4" />
                      <p>Aucune donnée d'évolution disponible</p>
                    </div>
                  )}
                </Card>
              </div>

              <Card className="p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Rapports Détaillés</h2>
                {reportLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin mx-auto mb-4" />
                    <p>Chargement des rapports...</p>
                  </div>
                ) : reports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Token</TableHead>
                          <TableHead>Commissions Totales</TableHead>
                          <TableHead>Nombre de Transactions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>
                              {new Date(report.period_start).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{report.token_symbol}</TableCell>
                            <TableCell>
                              {parseFloat(report.total_commission_amount.toString()).toFixed(6)}
                            </TableCell>
                            <TableCell>{report.transaction_count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <LineChartIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <p>Aucun rapport de commission disponible</p>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommissionSettings;
