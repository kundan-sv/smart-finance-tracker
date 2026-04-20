import { CURRENCIES, CurrencyCode, useCurrency } from "@/lib/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency.code} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
      <SelectTrigger className="w-full h-10">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(CURRENCIES).map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.symbol} {c.code} — {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
