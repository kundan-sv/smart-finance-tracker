import { useState } from "react";
import { CATEGORIES, Transaction } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { CurrencySelector } from "@/components/CurrencySelector";

interface Props {
  onAdd: (tx: Omit<Transaction, "id">) => void;
}

export function AddTransactionForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || !category) return;

    onAdd({
      amount: type === "expense" ? -Math.abs(numAmount) : Math.abs(numAmount),
      category,
      description,
      date: new Date().toISOString(),
    });

    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === "income" ? "default" : "outline"}
              className={type === "income" ? "bg-income" : ""}
              onClick={() => setType("income")}
              size="sm"
            >
              Income
            </Button>
            <Button
              type="button"
              variant={type === "expense" ? "default" : "outline"}
              className={type === "expense" ? "bg-expense" : ""}
              onClick={() => setType("expense")}
              size="sm"
            >
              Expense
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <CurrencySelector />
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
