"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { AppUser, BusinessProfile, Customer, Invoice, InvoiceItem, InvoiceStatus } from "@/lib/types/invoice";

const KLEINUNTERNEHMER_NOTICE = "Gemäß §19 UStG keine USt-Ausweisung.";
const COMPANY_NAME = "DS - Service";

const defaultProfile: BusinessProfile = {
  fullName: "Devin Stoll",
  companyName: COMPANY_NAME,
  companyAddress: "Musterstraße 12\n92245 Kümmersbruck",
  email: "devin.stoll@example.de",
  phone: "+49 151 12345678",
  steuernummer: "203/456/78901",
  ustId: "",
  iban: "DE02120300000000202051",
  bic: "BYLADEM1001",
  kleinunternehmerDefault: true
};

type AppState = {
  user: AppUser;
  profile: BusinessProfile;
  customers: Customer[];
  invoices: Invoice[];
  bootstrapUser: () => boolean;
  loginAsDevin: () => void;
  logout: () => void;
  addCustomer: (input: Omit<Customer, "id" | "createdAt">) => Customer;
  addInvoice: (input: {
    customerId: string;
    subject: string;
    notes?: string;
    kleinunternehmer: boolean;
    items: InvoiceItem[];
  }) => Invoice;
  updateInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  archiveInvoice: (invoiceId: string) => void;
  updateProfile: (input: BusinessProfile) => void;
  ensureDemoData: () => void;
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const computeTotal = (items: InvoiceItem[]): number =>
  Math.round((items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) + Number.EPSILON) * 100) / 100;

const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const formatInvoicePrefix = (dateIso: string): string => {
  const date = new Date(dateIso);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}-${month}`;
};

const nextInvoiceNumber = (invoices: Invoice[], dateIso: string): string => {
  const prefix = formatInvoicePrefix(dateIso);

  const maxSequence = invoices
    .filter((invoice) => invoice.invoiceNumber.startsWith(`${prefix}-`))
    .reduce((highest, invoice) => {
      const current = Number(invoice.invoiceNumber.split("-").at(-1) ?? "0");
      return Number.isNaN(current) ? highest : Math.max(highest, current);
    }, 0);

  return `${prefix}-${`${maxSequence + 1}`.padStart(3, "0")}`;
};

const safeArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
const normalizeProfile = (value: unknown): BusinessProfile => ({
  ...defaultProfile,
  ...(typeof value === "object" && value ? (value as Partial<BusinessProfile>) : {}),
  companyName: COMPANY_NAME
});

const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // ignore write errors (private mode / disabled storage)
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore remove errors
    }
  }
};

const persistUserKey = (user: AppUser | null) => {
  if (typeof window === "undefined") return;

  try {
    if (!user || !user.loggedIn) {
      localStorage.removeItem("user");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name: user.name }));
  } catch {
    // ignore storage errors
  }
};

const readUserKey = (): AppUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { name?: string };
    if (!parsed.name) return null;
    return { name: parsed.name, loggedIn: true };
  } catch {
    return null;
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: { name: "", loggedIn: false },
      profile: normalizeProfile(defaultProfile),
      customers: [],
      invoices: [],

      bootstrapUser: () => {
        const localUser = readUserKey();
        if (localUser) {
          set({ user: localUser });
          return true;
        }
        return get().user.loggedIn;
      },

      loginAsDevin: () => {
        const user = { name: "Devin Stoll", loggedIn: true };
        set({ user });
        persistUserKey(user);
        get().ensureDemoData();
      },

      logout: () => {
        set({ user: { name: "", loggedIn: false } });
        persistUserKey(null);
      },

      addCustomer: (input) => {
        const customer: Customer = {
          id: createId(),
          createdAt: new Date().toISOString(),
          ...input
        };

        set((state) => ({
          customers: [customer, ...safeArray<Customer>(state.customers)]
        }));

        return customer;
      },

      addInvoice: (input) => {
        const state = get();
        const customers = safeArray<Customer>(state.customers);
        const invoices = safeArray<Invoice>(state.invoices);

        const customer = customers.find((entry) => entry.id === input.customerId);
        if (!customer) {
          throw new Error("Bitte zuerst einen Kunden anlegen.");
        }

        if (input.items.length === 0 || input.items.some((item) => item.quantity <= 0 || item.unitPrice < 0)) {
          throw new Error("Positionen sind ungültig.");
        }

        const now = new Date();
        const nowIso = now.toISOString();
        const dueDateIso = addDays(now, 14).toISOString();
        const totalAmount = computeTotal(input.items);

        const notes = input.kleinunternehmer
          ? [input.notes?.trim(), KLEINUNTERNEHMER_NOTICE].filter(Boolean).join("\n\n")
          : input.notes?.trim() || "";

        const invoice: Invoice = {
          id: createId(),
          invoiceNumber: nextInvoiceNumber(invoices, nowIso),
          customerId: input.customerId,
          date: nowIso,
          dueDate: dueDateIso,
          subject: input.subject,
          items: input.items,
          totalAmount,
          status: "draft",
          notes,
          kleinunternehmer: input.kleinunternehmer,
          isArchived: false,
          createdAt: nowIso,
          updatedAt: nowIso
        };

        set((prev) => ({
          invoices: [invoice, ...safeArray<Invoice>(prev.invoices)]
        }));

        return invoice;
      },

      updateInvoiceStatus: (invoiceId, status) => {
        set((state) => ({
          invoices: safeArray<Invoice>(state.invoices).map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, status, updatedAt: new Date().toISOString() } : invoice
          )
        }));
      },

      archiveInvoice: (invoiceId) => {
        set((state) => ({
          invoices: safeArray<Invoice>(state.invoices).map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, isArchived: true, updatedAt: new Date().toISOString() } : invoice
          )
        }));
      },

      updateProfile: (input) => {
        set({ profile: normalizeProfile(input) });
      },

      ensureDemoData: () => {
        const state = get();
        if (safeArray<Customer>(state.customers).length > 0 || safeArray<Invoice>(state.invoices).length > 0) return;

        const demoCustomer = get().addCustomer({
          name: "Beispielkunde Amberg",
          address: "Regensburger Straße 99\n92224 Amberg",
          email: "kunde@example.de",
          phone: "+49 9621 100200",
          steuernummer: ""
        });

        get().addInvoice({
          customerId: demoCustomer.id,
          subject: "Gartenpflege Frühjahr",
          notes: "Leistung wie besprochen ausgeführt.",
          kleinunternehmer: true,
          items: [
            { description: "Rasenmähen 250qm", quantity: 1, unitPrice: 85 },
            { description: "Heckenschnitt", quantity: 2, unitPrice: 45 }
          ]
        });
      }
    }),
    {
      name: "rechnungs-app-store",
      storage: createJSONStorage(() => safeStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<AppState>;

        return {
          ...currentState,
          ...persisted,
          user: persisted.user ?? currentState.user,
          profile: normalizeProfile(persisted.profile ?? currentState.profile),
          customers: safeArray<Customer>(persisted.customers ?? currentState.customers),
          invoices: safeArray<Invoice>(persisted.invoices ?? currentState.invoices)
        };
      }
    }
  )
);
