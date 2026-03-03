"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Hammer } from "lucide-react";
import { useRouter } from "next/navigation";

import { loginAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function IndexPage() {
  const router = useRouter();
  const user = useAppStore((state) =>
    state.user && typeof state.user.loggedIn === "boolean" ? state.user : { name: "", loggedIn: false }
  );
  const bootstrapUser = useAppStore((state) => state.bootstrapUser);

  useEffect(() => {
    bootstrapUser();
  }, [bootstrapUser]);

  useEffect(() => {
    if (user.loggedIn) {
      router.replace("/dashboard");
    }
  }, [router, user.loggedIn]);

  return (
    <main className="container flex min-h-screen items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#EBD4C3]/80 via-transparent to-emerald-100/35" />
          <CardHeader>
            <CardTitle className="text-4xl tracking-tight text-stone-800">Rechnungs-App für Handwerker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-base text-stone-600">
              Sofort startklar ohne Keys oder Setup. Anmeldung als Demo-User <strong>Devin Stoll</strong>.
            </p>

            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => {
                loginAction();
                router.push("/dashboard");
              }}
            >
              <Hammer className="mr-2 h-4 w-4" /> Login als Devin Stoll
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
