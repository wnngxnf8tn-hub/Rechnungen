"use client";

import { useTransition } from "react";
import { Archive } from "lucide-react";

import { archiveInvoiceAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export const ArchiveInvoiceButton = ({
  invoiceId,
  disabled
}: {
  invoiceId: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      className="px-5"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(() => {
          archiveInvoiceAction(invoiceId);
        });
      }}
    >
      <Archive className="mr-2 h-4 w-4" />
      {isPending ? "Archiviert..." : "GoBD-Archivierung"}
    </Button>
  );
};
