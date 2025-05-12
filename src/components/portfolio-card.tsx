
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// Demo data for chart
const chartData = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 9800 },
  { name: "Mar", value: 10200 },
  { name: "Apr", value: 10900 },
  { name: "May", value: 11400 },
  { name: "Jun", value: 11800 },
  { name: "Jul", value: 12430.75 },
];

const PortfolioCard = () => {
  return (
    <Card className="border-none bg-veegox-card-bg">
      <CardHeader>
        <CardTitle className="text-xl">Your Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="text-4xl font-bold">$12,430.75</div>
          <div className="text-sm text-green-500">+5.2% this month</div>
        </div>
        
        {/* Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 0, left: -30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                hide={true}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  color: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value"
                stroke="#9b87f5" 
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Portfolio breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span>Lending</span>
            <span className="font-semibold">$4,250.00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span>Savings</span>
            <span className="font-semibold">$3,180.50</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span>Staking</span>
            <span className="font-semibold">$2,500.25</span>
          </div>
          <div className="flex justify-between py-2">
            <span>AI Investing</span>
            <span className="font-semibold">$2,500.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
