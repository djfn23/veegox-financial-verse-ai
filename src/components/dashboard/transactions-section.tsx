
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Transaction } from "@/services/crypto-service";

interface TransactionsSectionProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionsSection = ({ transactions, isLoading }: TransactionsSectionProps) => {
  // Fonction pour formater l'adresse
  const formatAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5);
  };

  // Fonction pour obtenir le type de transaction traduit
  const getTransactionType = (type: string) => {
    const types: Record<string, string> = {
      "transfer": "Transfert",
      "deposit": "Dépôt",
      "withdraw": "Retrait",
      "stake": "Staking",
      "unstake": "Unstaking",
      "borrow": "Emprunt",
      "repay": "Remboursement",
      "swap": "Échange"
    };
    return types[type] || type;
  };

  // Fonction pour obtenir l'URL d'explorateur de blockchain
  const getExplorerUrl = (txHash: string, networkId: number) => {
    switch (networkId) {
      case 1: return `https://etherscan.io/tx/${txHash}`;
      case 137: return `https://polygonscan.com/tx/${txHash}`;
      case 56: return `https://bscscan.com/tx/${txHash}`;
      default: return `https://etherscan.io/tx/${txHash}`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-veegox-card-bg rounded-lg p-4 animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-veegox-dark-bg rounded-lg"></div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-veegox-card-bg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Historique des Transactions</h2>
        <div className="bg-veegox-dark-bg rounded-lg p-6 text-center">
          <AlertCircle className="h-10 w-10 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400">Aucune transaction trouvée pour cette adresse</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-veegox-card-bg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Historique des Transactions</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Tx Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 10).map((tx) => (
              <TableRow key={tx.id || tx.tx_hash}>
                <TableCell className="font-medium">
                  {getTransactionType(tx.tx_type)}
                </TableCell>
                <TableCell>
                  {parseFloat(tx.amount.toString()).toFixed(4)} {tx.token_symbol}
                </TableCell>
                <TableCell>{formatDate(tx.timestamp)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tx.status === "confirmed" ? "bg-green-900/30 text-green-500" :
                    tx.status === "pending" ? "bg-yellow-900/30 text-yellow-500" :
                    "bg-red-900/30 text-red-500"
                  }`}>
                    {tx.status === "confirmed" ? "Confirmée" :
                     tx.status === "pending" ? "En attente" : "Échouée"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <a 
                    href={getExplorerUrl(tx.tx_hash, tx.network_id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-veegox-purple hover:text-veegox-blue transition-colors"
                  >
                    {formatAddress(tx.tx_hash)}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsSection;
