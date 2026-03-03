"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global route error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-6">
      <div className="w-full rounded-3xl border border-stone-200 bg-[#F3F2ED] p-8 shadow-soft">
        <h1 className="font-display text-3xl font-semibold text-stone-800">Interner Fehler</h1>
        <p className="mt-2 text-sm text-stone-600">
          Die Seite konnte nicht geladen werden. Bitte einmal neu laden.
        </p>
        {error.digest ? <p className="mt-2 text-xs text-stone-500">Digest: {error.digest}</p> : null}
        <div className="mt-6">
          <Button onClick={reset}>Erneut versuchen</Button>
        </div>
      </div>
    </div>
  );
}
