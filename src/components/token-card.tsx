
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TokenCardProps {
  tokenName: string;
  tokenSymbol: string;
  description: string;
  price: string;
  change: string;
  isPositive: boolean;
  gradient?: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  tokenName,
  tokenSymbol,
  description,
  price,
  change,
  isPositive,
  gradient = "from-veegox-purple to-veegox-blue",
}) => {
  return (
    <Card className="overflow-hidden border-none">
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{tokenName}</CardTitle>
            <CardDescription className="text-sm text-gray-400">{tokenSymbol}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{price}</div>
            <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TokenCard;
