"use client";

import { useTransition } from "react";

import { updateInvoiceStatusAction } from "@/app/actions";
import { Select } from "@/components/ui/select";
import type { InvoiceStatus } from "@/lib/types/invoice";

const statuses: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];

export const InvoiceStatusSelect = ({ invoiceId, value }: { invoiceId: string; value: InvoiceStatus }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={value}
      disabled={isPending}
      onChange={(event) => {
        const nextStatus = event.target.value as InvoiceStatus;
        startTransition(() => {
          updateInvoiceStatusAction(invoiceId, nextStatus);
        });
      }}
      className="w-[168px] rounded-full bg-[#FBFAF6]"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status.toUpperCase()}
        </option>
      ))}
    </Select>
  );
};
