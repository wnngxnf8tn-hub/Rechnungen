"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, FileCheck, Hourglass, Receipt, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils/format";

export default function DashboardPage() {
  const invoices = useAppStore((state) => (Array.isArray(state.invoices) ? state.invoices : []));

  const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
  const paidCount = invoices.filter((invoice) => invoice.status === "paid").length;
  const overdueCount = invoices.filter((invoice) => invoice.status === "overdue").length;
  const openCount = invoices.length - paidCount;

  return (
    <div className="space-y-7">
      <section className="grid auto-rows-[minmax(150px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-4">
        <motion.div
          className="md:col-span-2 xl:col-span-2"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="relative">
              <CardTitle className="flex items-center justify-between text-sm text-stone-600">
                Gesamtumsatz <CircleDollarSign className="h-4 w-4 text-[#384E36]" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <p className="text-4xl font-semibold tracking-tight text-stone-800">{formatCurrency(totalRevenue)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm text-stone-600">
                Rechnungen gesamt <Receipt className="h-4 w-4 text-[#384E36]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-stone-800">{invoices.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm text-stone-600">
                Offen <Hourglass className="h-4 w-4 text-[#9E4E1E]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-stone-800">{openCount}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm text-stone-600">
                Bezahlt <FileCheck className="h-4 w-4 text-[#384E36]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-stone-800">{paidCount}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm text-stone-600">
                Überfällig <Hourglass className="h-4 w-4 text-[#9E4E1E]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-stone-800">{overdueCount}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="md:col-span-2 xl:col-span-2"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-stone-600">
                <Sparkles className="h-4 w-4 text-[#9E4E1E]" />
                Fokus heute
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-[#FBFAF6] p-6 text-center">
                  <Sparkles className="mx-auto mb-3 h-10 w-10 text-stone-400" />
                  <p className="text-sm text-stone-600">
                    Noch keine Rechnungen diesen Monat geschrieben. Zeit, Geld zu verdienen!
                  </p>
                </div>
              ) : (
                <p className="text-sm text-stone-600">Rechnungen vorhanden. Du kannst direkt weiterarbeiten.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
