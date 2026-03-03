"use client";

import { RequireLogin } from "@/components/auth/require-login";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageMotion } from "@/components/layout/page-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireLogin>
      <DashboardShell>
        <PageMotion>{children}</PageMotion>
      </DashboardShell>
    </RequireLogin>
  );
}
