"use client";

import { UserRoundSearch } from "lucide-react";

import { CustomerForm } from "@/components/invoice/customer-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function CustomersPage() {
  const customers = useAppStore((state) => (Array.isArray(state.customers) ? state.customers : []));

  return (
    <div className="space-y-7">
      <CustomerForm />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Bestehende Kunden</CardTitle>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-[#FBFAF6] px-6 py-16 text-center">
              <UserRoundSearch className="mx-auto mb-4 h-14 w-14 text-stone-400" />
              <p className="text-base font-medium text-stone-800">Noch keine Kunden angelegt.</p>
              <p className="mt-1 text-sm text-stone-600">Lege deinen ersten Kunden an und starte direkt mit Rechnungen.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-2xl border border-stone-200 bg-[#FBFAF6] px-5 py-4 transition-all duration-300 hover:bg-stone-50"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-base font-semibold tracking-tight text-stone-800">{customer.name}</p>
                      <p className="whitespace-pre-line text-sm text-stone-600">{customer.address}</p>
                    </div>
                    <div className="space-y-1 text-sm text-stone-600 md:text-right">
                      <p>{customer.email || "-"}</p>
                      <p>{customer.phone || "-"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
