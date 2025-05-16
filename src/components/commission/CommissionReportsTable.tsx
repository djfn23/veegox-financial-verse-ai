
import React from "react";
import { CommissionReport } from "@/services/commission-service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, RefreshCw } from "lucide-react";

interface CommissionReportsTableProps {
  reports: CommissionReport[];
  loading: boolean;
}

const CommissionReportsTable: React.FC<CommissionReportsTableProps> = ({ reports, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin mx-auto mb-4" />
        <p>Chargement des rapports...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <p>Aucun rapport de commission disponible</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Commissions Totales</TableHead>
            <TableHead>Nombre de Transactions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                {new Date(report.period_start).toLocaleDateString()}
              </TableCell>
              <TableCell>{report.token_symbol}</TableCell>
              <TableCell>
                {parseFloat(report.total_commission_amount.toString()).toFixed(6)}
              </TableCell>
              <TableCell>{report.transaction_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommissionReportsTable;
