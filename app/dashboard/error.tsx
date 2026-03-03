"use client";

import { useEffect } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl py-10">
      <div className="rounded-3xl border border-stone-200 bg-[#F3F2ED] p-8 shadow-soft">
        <h2 className="font-display text-3xl font-semibold text-stone-800">Dashboard konnte nicht geladen werden</h2>
        <p className="mt-2 text-sm text-stone-600">
          Das ist ein Laufzeitfehler in der Route. Bitte einmal neu versuchen.
        </p>
        {error.digest ? <p className="mt-2 text-xs text-stone-500">Digest: {error.digest}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className={cn(buttonVariants())} onClick={reset}>
            Neu laden
          </button>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
