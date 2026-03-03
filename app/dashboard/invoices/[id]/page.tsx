"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

import { InvoicePDFDocument } from "@/components/InvoicePDF";
import { ArchiveInvoiceButton } from "@/components/invoice/archive-invoice-button";
import { InvoiceStatusSelect } from "@/components/invoice/invoice-status-select";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const invoiceId = typeof params?.id === "string" ? params.id : "";

  const invoice = useAppStore((state) =>
    (Array.isArray(state.invoices) ? state.invoices : []).find((entry) => entry.id === invoiceId)
  );
  const customer = useAppStore((state) =>
    (Array.isArray(state.customers) ? state.customers : []).find((entry) => entry.id === invoice?.customerId)
  );
  const profile = useAppStore((state) => state.profile);

  if (!invoice || !customer) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-stone-600">Rechnung nicht gefunden.</p>
        <button className={cn(buttonVariants({ variant: "outline" }))} onClick={() => router.push("/dashboard/invoices")}>
          Zurück
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-800">Rechnung {invoice.invoiceNumber}</h1>
          <p className="text-sm text-stone-600">
            {customer.name} | {formatDate(new Date(invoice.date))}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <InvoiceStatusSelect invoiceId={invoice.id} value={invoice.status} />
          <ArchiveInvoiceButton invoiceId={invoice.id} disabled={invoice.isArchived} />
          <PDFDownloadLink
            document={<InvoicePDFDocument invoice={invoice} customer={customer} profile={profile} />}
            fileName={`${invoice.invoiceNumber}-DS-Service.pdf`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {({ loading }) => (
              <span className="inline-flex items-center">
                <Download className="mr-2 h-4 w-4" /> {loading ? "PDF wird erstellt..." : "PDF Download"}
              </span>
            )}
          </PDFDownloadLink>
          <Link href="/dashboard/invoices" className={cn(buttonVariants({ variant: "ghost" }))}>
            Zur Liste
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-stone-500">Kunde</p>
              <p className="font-semibold text-stone-800">{customer.name}</p>
              <p className="whitespace-pre-line text-sm text-stone-600">{customer.address}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-stone-500">Archivstatus</p>
              <Badge variant={invoice.isArchived ? "success" : "warning"}>
                {invoice.isArchived ? "Archiviert" : "Aktiv"}
              </Badge>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FBFAF6]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leistung</TableHead>
                  <TableHead className="text-right">Menge</TableHead>
                  <TableHead className="text-right">Einzelpreis</TableHead>
                  <TableHead className="text-right">Gesamt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <p className="rounded-2xl border border-stone-200 bg-stone-100 px-5 py-3 text-lg font-semibold text-stone-800">
              Gesamt: {formatCurrency(invoice.totalAmount)}
            </p>
          </div>

          {invoice.notes ? (
            <div className="whitespace-pre-line rounded-2xl border border-stone-200 bg-stone-100/70 p-4 text-sm text-stone-700">
              {invoice.notes}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
