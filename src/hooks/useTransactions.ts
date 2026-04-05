import { useState, useCallback } from "react";
import {
  Transaction,
  loadTransactions,
  saveTransactions,
  getBalance,
  getTotalIncome,
  getTotalExpenses,
  getCategoryBreakdown,
  getSuspiciousTransactions,
} from "@/lib/finance";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);

  const addTransaction = useCallback(
    (tx: Omit<Transaction, "id">) => {
      const newTx: Transaction = { ...tx, id: crypto.randomUUID() };
      const updated = [newTx, ...transactions];
      setTransactions(updated);
      saveTransactions(updated);
    },
    [transactions]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      const updated = transactions.filter((t) => t.id !== id);
      setTransactions(updated);
      saveTransactions(updated);
    },
    [transactions]
  );

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    balance: getBalance(transactions),
    totalIncome: getTotalIncome(transactions),
    totalExpenses: getTotalExpenses(transactions),
    categoryBreakdown: getCategoryBreakdown(transactions),
    suspiciousTransactions: getSuspiciousTransactions(transactions),
  };
}
