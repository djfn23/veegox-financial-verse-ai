
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface NewCommissionFormProps {
  newSetting: {
    token_symbol: string;
    tx_type: string;
    percentage: number;
    min_amount: number | null;
    max_amount: number | null;
    is_active: boolean;
  };
  onChangeField: (field: string, value: any) => void;
  onSubmit: () => void;
}

const NewCommissionForm: React.FC<NewCommissionFormProps> = ({
  newSetting,
  onChangeField,
  onSubmit
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="token_symbol">Symbol du Token</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Le symbole du token (ex: VEX, ETH, USDC)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="token_symbol"
          value={newSetting.token_symbol}
          onChange={(e) => onChangeField('token_symbol', e.target.value)}
          placeholder="VEX, ETH, USDC..."
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="tx_type">Type de Transaction</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Type d'opération (ex: transfer, stake, withdraw)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="tx_type"
          value={newSetting.tx_type}
          onChange={(e) => onChangeField('tx_type', e.target.value)}
          placeholder="transfer, stake, withdraw..."
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="percentage">Pourcentage (%)</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Pourcentage de commission (entre 0 et 100)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="percentage"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={newSetting.percentage}
          onChange={(e) => onChangeField('percentage', parseFloat(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="min_amount">Montant Min. (Token)</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Montant minimum auquel la commission s'applique (en token)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="min_amount"
          type="number"
          step="0.001"
          min="0"
          value={newSetting.min_amount || ''}
          onChange={(e) => onChangeField('min_amount', e.target.value ? parseFloat(e.target.value) : null)}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="max_amount">Montant Max. (Token)</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Montant maximum auquel la commission s'applique (laisser vide pour illimité)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input 
          id="max_amount"
          type="number"
          step="0.001"
          min="0"
          value={newSetting.max_amount || ''}
          onChange={(e) => onChangeField('max_amount', e.target.value ? parseFloat(e.target.value) : null)}
          placeholder="Illimité"
          className="mt-1"
        />
      </div>

      <div className="flex items-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onSubmit} 
              className="w-full"
            >
              Ajouter
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ajouter ce paramètre de commission</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default NewCommissionForm;
