
import React from "react";
import { Card } from "@/components/ui/card";
import { CommissionSetting } from "@/services/commission-service";
import CommissionSettingsList from "./CommissionSettingsList";
import NewCommissionForm from "./NewCommissionForm";

interface SettingsTabProps {
  settings: CommissionSetting[];
  loading: boolean;
  newSetting: {
    token_symbol: string;
    tx_type: string;
    percentage: number;
    min_amount: number | null;
    max_amount: number | null;
    is_active: boolean;
  };
  onUpdateSetting: (id: string, field: string, value: any) => void;
  onToggleActive: (setting: CommissionSetting) => void;
  onChangeNewSettingField: (field: string, value: any) => void;
  onAddSetting: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  loading,
  newSetting,
  onUpdateSetting,
  onToggleActive,
  onChangeNewSettingField,
  onAddSetting
}) => {
  return (
    <>
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Paramètres de Commission</h2>
        <CommissionSettingsList
          settings={settings}
          loading={loading}
          onUpdateSetting={onUpdateSetting}
          onToggleActive={onToggleActive}
        />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un Paramètre</h2>
        <NewCommissionForm
          newSetting={newSetting}
          onChangeField={onChangeNewSettingField}
          onSubmit={onAddSetting}
        />
      </Card>
    </>
  );
};

export default SettingsTab;
