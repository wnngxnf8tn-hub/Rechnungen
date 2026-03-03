"use client";

import { useAppStore } from "@/lib/store";
import type { BusinessProfile, InvoiceItem, InvoiceStatus } from "@/lib/types/invoice";

export const loginAction = () => {
  useAppStore.getState().loginAsDevin();
  return { ok: true };
};

export const logoutAction = () => {
  useAppStore.getState().logout();
  return { ok: true };
};

export const createCustomerAction = (input: {
  name: string;
  address: string;
  email?: string;
  phone?: string;
  steuernummer?: string;
}) => {
  if (!input.name.trim() || !input.address.trim()) {
    return { ok: false, message: "Name und Adresse sind erforderlich." };
  }

  useAppStore.getState().addCustomer({
    name: input.name.trim(),
    address: input.address.trim(),
    email: input.email?.trim() || "",
    phone: input.phone?.trim() || "",
    steuernummer: input.steuernummer?.trim() || ""
  });

  return { ok: true };
};

export const createInvoiceAction = (input: {
  customerId: string;
  subject: string;
  notes?: string;
  kleinunternehmer: boolean;
  items: InvoiceItem[];
}) => {
  try {
    const created = useAppStore.getState().addInvoice({
      customerId: input.customerId,
      subject: input.subject.trim(),
      notes: input.notes,
      kleinunternehmer: input.kleinunternehmer,
      items: input.items
    });

    return { ok: true, invoiceId: created.id };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Rechnung konnte nicht erstellt werden." };
  }
};

export const updateInvoiceStatusAction = (invoiceId: string, status: InvoiceStatus) => {
  useAppStore.getState().updateInvoiceStatus(invoiceId, status);
  return { ok: true };
};

export const archiveInvoiceAction = (invoiceId: string) => {
  useAppStore.getState().archiveInvoice(invoiceId);
  return { ok: true };
};

export const upsertProfileAction = (input: BusinessProfile) => {
  useAppStore.getState().updateProfile(input);
  return { ok: true };
};
