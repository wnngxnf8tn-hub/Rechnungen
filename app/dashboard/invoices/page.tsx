"use client";

import { InvoiceForm } from "@/components/invoice/invoice-form";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function InvoicesPage() {
  const invoices = useAppStore((state) => (Array.isArray(state.invoices) ? state.invoices : []));
  const customers = useAppStore((state) => (Array.isArray(state.customers) ? state.customers : []));

  return (
    <div className="space-y-7">
      <InvoiceForm
        customers={customers.map((customer) => ({
          id: customer.id,
          name: customer.name
        }))}
      />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Rechnungsliste</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceTable
            rows={invoices.map((invoice) => ({
              id: invoice.id,
              invoiceNumber: invoice.invoiceNumber,
              customerName: customers.find((customer) => customer.id === invoice.customerId)?.name ?? "Unbekannt",
              totalAmount: invoice.totalAmount,
              date: invoice.date
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
