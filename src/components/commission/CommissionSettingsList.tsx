
import React from "react";
import { CommissionSetting } from "@/services/commission-service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Settings } from "lucide-react";

interface CommissionSettingsListProps {
  settings: CommissionSetting[];
  loading: boolean;
  onUpdateSetting: (id: string, field: string, value: any) => void;
  onToggleActive: (setting: CommissionSetting) => void;
}

const CommissionSettingsList: React.FC<CommissionSettingsListProps> = ({
  settings,
  loading,
  onUpdateSetting,
  onToggleActive
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin mx-auto mb-4" />
        <p>Chargement des paramètres...</p>
      </div>
    );
  }

  if (settings.length === 0) {
    return (
      <div className="text-center py-8">
        <Settings className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <p>Aucun paramètre de commission configuré</p>
      </div>
    );
  }

  return (
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
                  onChange={(e) => onUpdateSetting(setting.id, 'percentage', e.target.value)}
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
                  onChange={(e) => onUpdateSetting(setting.id, 'min_amount', e.target.value)}
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
                  onChange={(e) => onUpdateSetting(setting.id, 'max_amount', e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Switch 
                  checked={setting.is_active} 
                  onCheckedChange={() => onToggleActive(setting)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommissionSettingsList;
