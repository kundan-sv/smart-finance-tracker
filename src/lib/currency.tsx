import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "JPY";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: "INR", symbol: "₹", locale: "en-IN", label: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", locale: "en-US", label: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", label: "Euro" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", label: "British Pound" },
  JPY: { code: "JPY", symbol: "¥", locale: "ja-JP", label: "Japanese Yen" },
};

const STORAGE_KEY = "finance-tracker-currency";

interface CurrencyContextValue {
  currency: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  format: (value: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    return saved && CURRENCIES[saved] ? saved : "INR";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, code);
  }, [code]);

  const currency = CURRENCIES[code];

  const format = (value: number) => {
    const fractionDigits = code === "JPY" ? 0 : 2;
    return `${currency.symbol}${value.toLocaleString(currency.locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setCode, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
