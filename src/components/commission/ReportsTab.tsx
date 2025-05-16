
import React from "react";
import { Card } from "@/components/ui/card";
import { CommissionReport } from "@/services/commission-service";
import CommissionCharts from "./CommissionCharts";
import CommissionReportsTable from "./CommissionReportsTable";

interface ReportsTabProps {
  reports: CommissionReport[];
  loading: boolean;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ reports, loading }) => {
  return (
    <>
      <CommissionCharts reports={reports} loading={loading} />

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Rapports Détaillés</h2>
        <CommissionReportsTable reports={reports} loading={loading} />
      </Card>
    </>
  );
};

export default ReportsTab;
