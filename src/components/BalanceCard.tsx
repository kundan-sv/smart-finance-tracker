import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/lib/currency";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function BalanceCard({ balance, totalIncome, totalExpenses }: Props) {
  const { format } = useCurrency();
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Hero balance card */}
      <Card className="md:col-span-1 bg-gradient-hero text-white border-0 shadow-elevated overflow-hidden relative">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
        <CardContent className="pt-6 pb-6 relative">
          <div className="flex items-center gap-2 text-white/70 text-xs font-medium uppercase tracking-wider">
            <Wallet className="h-3.5 w-3.5" />
            Total Balance
          </div>
          <p className={`text-3xl font-display font-bold mt-2 tabular-nums ${balance >= 0 ? "text-white" : "text-red-300"}`}>
            {balance < 0 && "−"}{format(Math.abs(balance))}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 backdrop-blur rounded-full px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Savings rate {savingsRate}%
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/60 shadow-soft hover:shadow-elevated transition-shadow">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Income</p>
              <p className="text-2xl font-display font-bold text-foreground tabular-nums">{format(totalIncome)}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-income/10">
              <TrendingUp className="h-5 w-5 text-income" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-income font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Money in
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/60 shadow-soft hover:shadow-elevated transition-shadow">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Expenses</p>
              <p className="text-2xl font-display font-bold text-foreground tabular-nums">{format(totalExpenses)}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-expense/10">
              <TrendingDown className="h-5 w-5 text-expense" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-expense font-medium">
            <ArrowDownRight className="h-3.5 w-3.5" />
            Money out
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
