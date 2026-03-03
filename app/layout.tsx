import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Rechnungs-App für Handwerker",
  description: "Lokal laufende Rechnungs-App mit Zustand, localStorage und PDF-Export"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark" suppressHydrationWarning>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
