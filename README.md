# Rechnungs-App (ohne Setup)

Client-only Next.js 15 App für Handwerker.

## Eigenschaften

- Fake-Login über localStorage (`user` = Devin Stoll)
- Datenhaltung mit Zustand + localStorage Persistenz
- Kunden, Rechnungen, Profil komplett lokal
- Fortlaufende Rechnungsnummern (`YYYY-MM-001`)
- PDF-Download mit `@react-pdf/renderer` (DIN-5008 orientiert)
- Kein Clerk, keine Datenbank, kein IronPDF, keine API-Keys

## Start

```bash
npm install
npm run dev
```

Danach:

- http://127.0.0.1:3001
- Button: `Login als Devin Stoll`

Hinweis zu Stabilität:

- `npm run dev` startet im stabilen Modus (`build + start`) und beendet vorher Prozesse auf Port 3000.
- `npm run dev` startet im stabilen Modus (`build + start`) und beendet vorher Prozesse auf Port 3001.
- Für Hot-Reload während UI-Entwicklung: `npm run dev:hot`

## Daten

Persistenz in Browser-localStorage:

- `user`
- `rechnungs-app-store`
