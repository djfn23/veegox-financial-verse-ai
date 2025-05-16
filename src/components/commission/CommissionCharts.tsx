
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  PieChart, 
  LineChart, 
  Line, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { LineChart as LineChartIcon, PieChartIcon, RefreshCw } from "lucide-react";
import { CommissionReport } from "@/services/commission-service";

interface CommissionChartsProps {
  reports: CommissionReport[];
  loading: boolean;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const CommissionCharts: React.FC<CommissionChartsProps> = ({ reports, loading }) => {
  // Préparer les données pour les graphiques
  const prepareReportData = () => {
    // Données pour le graphique en camembert (répartition par token)
    const pieData = reports.reduce((acc, report) => {
      const existing = acc.find(item => item.name === report.token_symbol);
      if (existing) {
        existing.value += report.total_commission_amount;
      } else {
        acc.push({
          name: report.token_symbol,
          value: report.total_commission_amount
        });
      }
      return acc;
    }, [] as Array<{ name: string; value: number }>);

    // Données pour le graphique linéaire (évolution par jour)
    const lineData: Array<{ date: string; [key: string]: number | string }> = [];
    
    reports.forEach(report => {
      const date = new Date(report.period_start).toLocaleDateString();
      const existing = lineData.find(item => item.date === date);
      
      if (existing) {
        if (existing[report.token_symbol] !== undefined) {
          existing[report.token_symbol] = (existing[report.token_symbol] as number) + report.total_commission_amount;
        } else {
          existing[report.token_symbol] = report.total_commission_amount;
        }
      } else {
        const newEntry: { date: string; [key: string]: number | string } = { date };
        newEntry[report.token_symbol] = report.total_commission_amount;
        lineData.push(newEntry);
      }
    });
    
    // Trier par date
    lineData.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return { pieData, lineData };
  };

  const { pieData, lineData } = reports.length > 0 ? prepareReportData() : { pieData: [], lineData: [] };

  // Obtenir la liste des tokens uniques pour le graphique linéaire
  const uniqueTokens = Array.from(new Set(reports.map(r => r.token_symbol)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Commissions par Token</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin" />
          </div>
        ) : pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | string) => {
                return typeof value === 'number' ? value.toFixed(4) : value;
              }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <PieChartIcon className="h-10 w-10 text-gray-400 mb-4" />
            <p>Aucune donnée de commission disponible</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Évolution des Commissions (30j)</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-10 w-10 text-veegox-purple animate-spin" />
          </div>
        ) : lineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {uniqueTokens.map((token, index) => (
                <Line
                  key={token}
                  type="monotone"
                  dataKey={token}
                  stroke={COLORS[index % COLORS.length]}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <LineChartIcon className="h-10 w-10 text-gray-400 mb-4" />
            <p>Aucune donnée d'évolution disponible</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommissionCharts;
