
import React from "react";
import { Card } from "@/components/ui/card";
import { CommissionSetting } from "@/services/commission-service";
import CommissionSettingsList from "./CommissionSettingsList";
import NewCommissionForm from "./NewCommissionForm";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

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
    <TooltipProvider>
      <Card className="p-6 mb-6">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Paramètres de Commission</h2>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="ml-2">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>
                <h4 className="font-medium">À propos des paramètres de commission</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Configurez les commissions par type de transaction et par token. Les paramètres incluent le pourcentage, 
                  les montants minimum et maximum, et peuvent être activés ou désactivés.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CommissionSettingsList
          settings={settings}
          loading={loading}
          onUpdateSetting={onUpdateSetting}
          onToggleActive={onToggleActive}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Ajouter un Paramètre</h2>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="ml-2">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>
                <h4 className="font-medium">Comment ajouter un paramètre</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Créez un nouveau paramètre de commission en spécifiant le token, le type de transaction, 
                  le pourcentage et les limites optionnelles. Les nouveaux paramètres sont actifs par défaut.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <NewCommissionForm
          newSetting={newSetting}
          onChangeField={onChangeNewSettingField}
          onSubmit={onAddSetting}
        />
      </Card>
    </TooltipProvider>
  );
};

export default SettingsTab;
