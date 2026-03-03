import { format, isValid } from "date-fns";
import { de } from "date-fns/locale";

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(value);

export const formatDate = (date: Date): string => {
  if (!isValid(date)) return "-";
  return format(date, "dd.MM.yyyy", { locale: de });
};

export const toIsoDateInput = (date: Date): string => format(date, "yyyy-MM-dd");
