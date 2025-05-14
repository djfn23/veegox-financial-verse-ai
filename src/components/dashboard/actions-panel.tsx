
import { Button } from "@/components/ui/button";
import { Coins, ArrowRightLeft, PiggyBank, Vote, LineChart, Wallet } from "lucide-react";

interface ActionsPanelProps {
  isConnected: boolean;
}

const ActionsPanel = ({ isConnected }: ActionsPanelProps) => {
  if (!isConnected) return null;

  return (
    <div className="bg-veegox-card-bg rounded-lg p-4">
      <h3 className="font-medium mb-2">Actions Rapides</h3>
      <div className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Coins className="mr-2 h-4 w-4" />
          Acheter des tokens
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Échanger des tokens
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Déposer des actifs
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <PiggyBank className="mr-2 h-4 w-4" />
          Staking
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Vote className="mr-2 h-4 w-4" />
          Voter (DAO)
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <LineChart className="mr-2 h-4 w-4" />
          Investir avec l'IA
        </Button>
      </div>
    </div>
  );
};

export default ActionsPanel;
