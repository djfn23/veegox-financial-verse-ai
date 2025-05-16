
import React from "react";
import { Card } from "@/components/ui/card";
import { CommissionReport } from "@/services/commission-service";
import CommissionCharts from "./CommissionCharts";
import CommissionReportsTable from "./CommissionReportsTable";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface ReportsTabProps {
  reports: CommissionReport[];
  loading: boolean;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ reports, loading }) => {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Graphiques de commissions</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="ml-2">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>
                <h4 className="font-medium">Visualisation des commissions</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Ces graphiques montrent les tendances des commissions perçues sur les 30 derniers jours, 
                  regroupées par token et par jour.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <CommissionCharts reports={reports} loading={loading} />

      <Card className="p-6 mt-6">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Rapports Détaillés</h2>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="ml-2">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>
                <h4 className="font-medium">À propos des rapports de commission</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Ce tableau présente le détail des commissions perçues par jour et par token, 
                  avec le montant total et le nombre de transactions concernées.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CommissionReportsTable reports={reports} loading={loading} />
      </Card>
    </>
  );
};

export default ReportsTab;
