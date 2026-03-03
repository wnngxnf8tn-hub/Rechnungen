"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";

import { createInvoiceAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CustomerOption = {
  id: string;
  name: string;
};

const parseNumericInput = (value: string): number => {
  const normalized = value.replace(/\s/g, "").replace(/€/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatEuroInput = (value: number): string =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export const InvoiceForm = ({ customers }: { customers: CustomerOption[] }) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [focusedPriceIndex, setFocusedPriceIndex] = useState<number | null>(null);

  const [customerId, setCustomerId] = useState(customers.at(0)?.id ?? "");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [kleinunternehmer, setKleinunternehmer] = useState(true);
  const [items, setItems] = useState([{ description: "", quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    if (!customerId && customers.length > 0) {
      setCustomerId(customers[0].id);
    }
  }, [customerId, customers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-stone-800">Neue Rechnung erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(null);

            startTransition(() => {
              const result = createInvoiceAction({
                customerId,
                subject,
                notes,
                kleinunternehmer,
                items
              });

              if (result.ok) {
                setSubject("");
                setNotes("");
                setItems([{ description: "", quantity: 1, unitPrice: 0 }]);
                setMessage(`Rechnung erstellt (ID ${result.invoiceId}).`);
                return;
              }

              setMessage(result.message ?? "Rechnung konnte nicht erstellt werden.");
            });
          }}
        >
          <p className="text-xs text-stone-600">Fälligkeitsdatum: 14 Tage nach Erhalt des Briefes.</p>

          <div className="space-y-1.5">
            <Label className="text-stone-700">Kunde</Label>
            <Select value={customerId} onChange={(event) => setCustomerId(event.target.value)} required>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-700">Betreff</Label>
            <Input value={subject} onChange={(event) => setSubject(event.target.value)} required />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-stone-700">Positionen</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }])}
              >
                <Plus className="mr-1 h-4 w-4" /> Position
              </Button>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid gap-2 rounded-2xl border border-stone-200 bg-[#FBFAF6] p-4 md:grid-cols-[minmax(0,1fr)_120px_120px_auto]"
              >
                <div className="space-y-1">
                  <Label className="text-xs text-stone-600">Leistungsbeschreibung</Label>
                  <Input
                    placeholder="Leistungsbeschreibung"
                    value={item.description}
                    onChange={(event) =>
                      setItems((prev) =>
                        prev.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, description: event.target.value } : entry
                        )
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-stone-600">Menge</Label>
                  <Input
                    aria-label="Menge"
                    type="text"
                    inputMode="decimal"
                    placeholder="Menge"
                    value={Number.isFinite(item.quantity) ? item.quantity : ""}
                    onChange={(event) =>
                      setItems((prev) =>
                        prev.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, quantity: parseNumericInput(event.target.value) } : entry
                        )
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-stone-600">Preis</Label>
                  <Input
                    aria-label="Preis"
                    type="text"
                    inputMode="decimal"
                    placeholder="Preis"
                    value={
                      focusedPriceIndex === index
                        ? String(item.unitPrice).replace(".", ",")
                        : formatEuroInput(item.unitPrice)
                    }
                    onChange={(event) =>
                      setItems((prev) =>
                        prev.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, unitPrice: parseNumericInput(event.target.value) } : entry
                        )
                      )
                    }
                    onFocus={() => setFocusedPriceIndex(index)}
                    onBlur={() => setFocusedPriceIndex((prev) => (prev === index ? null : prev))}
                    required
                  />
                </div>
                {items.length > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setItems((prev) => prev.filter((_, entryIndex) => entryIndex !== index))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-700">Notizen</Label>
            <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
          </div>

          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={kleinunternehmer}
              onChange={(event) => setKleinunternehmer(event.target.checked)}
              className="h-4 w-4 rounded border-stone-300 accent-[#384E36]"
            />
            Kleinunternehmerregelung nach §19 UStG anwenden
          </label>

          <Button type="submit" size="lg" disabled={isPending || customers.length === 0}>
            {isPending ? "Erstellt..." : "Rechnung anlegen"}
          </Button>

          {message ? <p className="text-sm text-stone-600">{message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
};
