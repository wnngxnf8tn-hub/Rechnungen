"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles } from "lucide-react";

import { formatCurrency, formatDate } from "@/lib/utils/format";

type InvoiceRow = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  date: string;
};

export const InvoiceTable = ({ rows }: { rows: InvoiceRow[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-300 bg-[#FBFAF6] px-6 py-16 text-center">
        <Sparkles className="mx-auto mb-4 h-14 w-14 text-stone-400" />
        <p className="text-lg font-medium text-stone-800">Noch keine Rechnungen diesen Monat geschrieben.</p>
        <p className="mt-1 text-sm text-stone-600">Zeit, Geld zu verdienen!</p>
      </div>
    );
  }

  return (
    <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="show">
      {rows.map((row) => (
        <motion.div
          key={row.id}
          variants={itemVariants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group rounded-2xl border border-stone-200 bg-[#FBFAF6] px-5 py-4 transition-all duration-300 hover:bg-stone-50 hover:shadow-soft"
        >
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_max-content] md:items-center md:gap-4">
            <div className="min-w-0 space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-500">Rechnung</p>
              <p className="text-base font-semibold tracking-tight text-stone-800">{row.invoiceNumber}</p>
              <p className="text-sm text-stone-600">
                {row.customerName} · {formatDate(new Date(row.date))}
              </p>
            </div>

            <div className="flex items-center gap-4 md:justify-self-end">
              <p className="whitespace-nowrap text-right text-lg font-semibold tracking-tight text-stone-800">
                {formatCurrency(row.totalAmount)}
              </p>
              <Link
                href={`/dashboard/invoices/${row.id}`}
                className="inline-flex whitespace-nowrap items-center gap-1 rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition-all duration-300 hover:border-[#384E36]/35 hover:bg-[#EDF3EA] hover:text-[#384E36]"
              >
                <FileText className="h-4 w-4" />
                Öffnen
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
