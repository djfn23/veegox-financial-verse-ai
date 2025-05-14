
import { Coins, PiggyBank, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StakingPosition, LendingPosition, AIPortfolio } from "@/services/crypto-service";

interface PositionsSectionProps {
  staking: StakingPosition[];
  lending: LendingPosition[];
  aiPortfolio: AIPortfolio | null;
  isLoading: boolean;
}

const PositionsSection = ({ staking, lending, aiPortfolio, isLoading }: PositionsSectionProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-veegox-card-bg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-gray-700 mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
              <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="flex justify-between items-center">
                  <div className="h-3 bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-700 rounded w-12"></div>
                </div>
              ))}
              <div className="pt-2">
                <div className="h-8 bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const hasNoPositions = (!staking || staking.length === 0) && 
                        (!lending || lending.length === 0) && 
                        !aiPortfolio;

  if (hasNoPositions) {
    return (
      <div className="bg-veegox-card-bg rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-veegox-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Coins className="h-8 w-8 text-veegox-purple" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Aucune position active</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Vous n'avez actuellement aucune position active dans l'écosystème Veegox.
          Explorez nos produits pour commencer à faire fructifier vos actifs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-veegox-gradient hover:opacity-90">
            <PiggyBank className="mr-2 h-4 w-4" />
            Stake VEX
          </Button>
          <Button variant="outline">
            <LineChart className="mr-2 h-4 w-4" />
            Investir avec l'IA
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Position de Staking */}
      <div className="bg-veegox-card-bg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <PiggyBank className="h-5 w-5 text-veegox-purple mr-2" />
            <h3 className="font-semibold">Staking</h3>
          </div>
          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
            {staking && staking.length > 0 ? 'Actif' : 'Inactif'}
          </span>
        </div>
        <div className="space-y-3">
          {staking && staking.length > 0 ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Token:</span>
                <span>{staking[0].token_symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Montant:</span>
                <span>{parseFloat(staking[0].amount.toString()).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Période de lock:</span>
                <span>{staking[0].lock_period} jours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Récompenses:</span>
                <span>{parseFloat(staking[0].rewards_earned.toString()).toFixed(4)}</span>
              </div>
              <div className="pt-2">
                <Button className="w-full" variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <PiggyBank className="h-10 w-10 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 mb-4">Aucune position de staking active</p>
              <Button className="w-full" variant="outline" size="sm">
                Staker
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Position de Prêt */}
      <div className="bg-veegox-card-bg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Coins className="h-5 w-5 text-veegox-purple mr-2" />
            <h3 className="font-semibold">Crédit</h3>
          </div>
          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
            {lending && lending.length > 0 ? 'Actif' : 'Inactif'}
          </span>
        </div>
        <div className="space-y-3">
          {lending && lending.length > 0 ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Montant emprunté:</span>
                <span>{parseFloat(lending[0].loan_amount.toString()).toFixed(2)} {lending[0].loan_token}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Collatéral:</span>
                <span>{parseFloat(lending[0].collateral_amount.toString()).toFixed(2)} {lending[0].collateral_token}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Taux d'intérêt:</span>
                <span>{lending[0].interest_rate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Échéance:</span>
                <span>{new Date(lending[0].due_date).toLocaleDateString()}</span>
              </div>
              <div className="pt-2">
                <Button className="w-full" variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <Coins className="h-10 w-10 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 mb-4">Aucun prêt actif</p>
              <Button className="w-full" variant="outline" size="sm">
                Emprunter
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Position IA */}
      <div className="bg-veegox-card-bg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <LineChart className="h-5 w-5 text-veegox-purple mr-2" />
            <h3 className="font-semibold">Portfolio IA</h3>
          </div>
          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
            {aiPortfolio ? 'Actif' : 'Inactif'}
          </span>
        </div>
        <div className="space-y-3">
          {aiPortfolio ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Valeur du portfolio:</span>
                <span>${parseFloat(aiPortfolio.total_value.toString()).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Performance (30j):</span>
                <span className={aiPortfolio.performance_30d >= 0 ? "text-green-500" : "text-red-500"}>
                  {aiPortfolio.performance_30d.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Stratégie:</span>
                <span>{aiPortfolio.ai_investment_strategies.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Niveau de risque:</span>
                <span>{aiPortfolio.ai_investment_strategies.risk_level}</span>
              </div>
              <div className="pt-2">
                <Button className="w-full" variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <LineChart className="h-10 w-10 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 mb-4">Aucun portfolio IA actif</p>
              <Button className="w-full" variant="outline" size="sm">
                Créer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionsSection;
