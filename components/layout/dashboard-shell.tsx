"use client";

import Link from "next/link";
import { FileText, Home, Leaf, LogOut, Settings, Users, Wrench } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { logoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useAppStore } from "@/lib/store";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/customers", label: "Kunden", icon: Users },
  { href: "/dashboard/invoices", label: "Rechnungen", icon: FileText },
  { href: "/dashboard/profile", label: "Profil", icon: Settings }
];

export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((state) =>
    state.user && typeof state.user.name === "string" ? state.user : { name: "", loggedIn: false }
  );

  return (
    <div className="min-h-screen pb-8">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-[#FAFAFA] shadow-sm">
        <div className="container flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-4">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-stone-800 lg:text-2xl">Handwerker Rechnungen</p>
            <p className="hidden text-xs text-stone-500 lg:block">Devin Stoll Workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-9 px-3 lg:h-10 lg:px-4"
              onClick={() => {
                logoutAction();
                router.push("/");
              }}
            >
              <LogOut className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container grid gap-5 pb-8 pt-20 lg:gap-6 lg:pt-28 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-stone-200 bg-[#F3F2ED] p-2 shadow-soft sm:p-3 lg:sticky lg:top-24 lg:z-30 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-auto lg:rounded-3xl lg:p-5">
          <div className="mb-3 hidden rounded-2xl border border-stone-200 bg-[#FBFAF6] p-3 lg:mb-6 lg:block lg:rounded-3xl lg:p-5">
            <div className="rounded-xl bg-gradient-to-br from-[#EDF3EA] to-[#F7F4EC] p-3 lg:rounded-2xl lg:p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#384E36]/10 p-2.5 text-[#384E36]">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-base font-semibold leading-tight text-stone-800">DS - Service</p>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#D8B08E] bg-[#EBD4C3] px-2.5 py-1 text-[10px] text-[#54280F]">
                    <Leaf className="h-3 w-3" />
                    {user.name || "Gast"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 px-1 pb-1 lg:grid-cols-1 lg:px-0 lg:pb-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-medium transition-all duration-300 sm:px-3 sm:text-sm lg:justify-start lg:gap-2.5 lg:rounded-2xl lg:px-4 lg:py-3",
                    active
                      ? "bg-[#EBD4C3] text-[#54280F]"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {active ? <span className="absolute bottom-1.5 left-4 hidden h-0.5 w-8 rounded-full bg-[#9E4E1E] lg:block" /> : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
};
