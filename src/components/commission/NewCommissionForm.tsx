
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="token_symbol">Symbol du Token</Label>
        <Input 
          id="token_symbol"
          value={newSetting.token_symbol}
          onChange={(e) => onChangeField('token_symbol', e.target.value)}
          placeholder="VEX, ETH, USDC..."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="tx_type">Type de Transaction</Label>
        <Input 
          id="tx_type"
          value={newSetting.tx_type}
          onChange={(e) => onChangeField('tx_type', e.target.value)}
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
          onChange={(e) => onChangeField('percentage', parseFloat(e.target.value))}
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
          onChange={(e) => onChangeField('min_amount', e.target.value ? parseFloat(e.target.value) : null)}
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
          onChange={(e) => onChangeField('max_amount', e.target.value ? parseFloat(e.target.value) : null)}
          placeholder="Illimité"
          className="mt-1"
        />
      </div>

      <div className="flex items-end">
        <Button 
          onClick={onSubmit} 
          className="w-full"
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};

export default NewCommissionForm;
