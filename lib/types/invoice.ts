export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type AppUser = {
  name: string;
  loggedIn: boolean;
};

export type Customer = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  steuernummer: string;
  createdAt: string;
};

export type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  date: string;
  dueDate: string;
  subject: string;
  items: InvoiceItem[];
  totalAmount: number;
  status: InvoiceStatus;
  notes: string;
  kleinunternehmer: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BusinessProfile = {
  fullName: string;
  companyName: string;
  companyAddress: string;
  email: string;
  phone: string;
  steuernummer: string;
  ustId: string;
  iban: string;
  bic: string;
  kleinunternehmerDefault: boolean;
};
