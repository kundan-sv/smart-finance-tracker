import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/lib/currency";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface Props {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function BalanceCard({ balance, totalIncome, totalExpenses }: Props) {
  const { format } = useCurrency();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? "text-income" : "text-expense"}`}>
                {format(Math.abs(balance))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-income/10">
              <TrendingUp className="h-5 w-5 text-income" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-2xl font-bold text-income">{format(totalIncome)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-expense/10">
              <TrendingDown className="h-5 w-5 text-expense" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="text-2xl font-bold text-expense">{format(totalExpenses)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
