"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils/cn";

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const user = useAppStore((state) => state.user);
  const bootstrapUser = useAppStore((state) => state.bootstrapUser);

  useEffect(() => {
    try {
      const loggedIn = bootstrapUser();
      if (!loggedIn && !user.loggedIn) {
        router.replace("/");
      }
    } finally {
      setIsChecking(false);
    }
  }, [bootstrapUser, router, user.loggedIn]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-stone-600">Anmeldung wird geprüft...</p>
      </div>
    );
  }

  if (!user.loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-[#F3F2ED] p-6 text-center shadow-soft">
          <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-[#9E4E1E]" />
          <p className="text-base font-semibold text-stone-800">Nicht eingeloggt</p>
          <p className="mt-1 text-sm text-stone-600">Bitte melde dich an, um das Dashboard zu öffnen.</p>
          <Link href="/" className={cn(buttonVariants(), "mt-4 inline-flex w-full")}>
            Zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
