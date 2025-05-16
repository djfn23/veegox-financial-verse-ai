
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { CommissionService, CommissionSetting, CommissionReport, CommissionFilters } from "@/services/commission-service";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Lock, LineChart as LineChartIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import des composants refactorisés
import SettingsTab from "@/components/commission/SettingsTab";
import ReportsTab from "@/components/commission/ReportsTab";

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

  // État pour les filtres des rapports
  const [filters, setFilters] = useState<CommissionFilters>({
    startDate: undefined,
    endDate: undefined,
    tokenSymbols: [],
    transactionTypes: []
  });

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

  const loadReports = async (reportFilters?: CommissionFilters) => {
    setReportLoading(true);
    try {
      // Utiliser les filtres fournis ou ceux actuellement stockés dans l'état
      const filtersToUse = reportFilters || filters;
      
      // Si aucun filtre de date n'est spécifié, utiliser les 30 derniers jours par défaut
      if (!filtersToUse.startDate) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtersToUse.startDate = thirtyDaysAgo;
      }
      
      const data = await CommissionService.getCommissionReports(filtersToUse);
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
  
  const handleApplyFilters = (newFilters: CommissionFilters) => {
    setFilters(newFilters);
    loadReports(newFilters);
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

  const handleChangeNewSettingField = (field: string, value: any) => {
    setNewSetting({...newSetting, [field]: value});
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
              <SettingsTab 
                settings={settings}
                loading={loading}
                newSetting={newSetting}
                onUpdateSetting={handleUpdateSetting}
                onToggleActive={handleToggleActive}
                onChangeNewSettingField={handleChangeNewSettingField}
                onAddSetting={handleAddSetting}
              />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsTab 
                reports={reports}
                loading={reportLoading}
                onApplyFilters={handleApplyFilters}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommissionSettings;
