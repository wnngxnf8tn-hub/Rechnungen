"use client";

import { Document, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

import type { BusinessProfile, Customer, Invoice } from "@/lib/types/invoice";
import { formatCurrency, formatDate } from "@/lib/utils/format";

const INVOICE_COMPANY_NAME = "DS - Service";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 50,
    paddingBottom: 42,
    paddingHorizontal: 52,
    color: "#0f172a"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },
  headerLeft: {
    flexGrow: 1,
    paddingRight: 16
  },
  senderCompany: {
    fontSize: 11,
    color: "#1f2937",
    marginBottom: 2,
    fontWeight: 700
  },
  senderAddress: {
    fontSize: 9,
    color: "#475569"
  },
  logoWrap: {
    width: 76,
    height: 52,
    marginTop: 0
  },
  addressBlock: {
    minHeight: 72,
    marginBottom: 20
  },
  metaBlock: {
    marginBottom: 18
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 3
  },
  metaKey: {
    width: 120,
    color: "#475569"
  },
  title: {
    fontSize: 21,
    color: "#1E3A8A",
    marginBottom: 10,
    fontWeight: 700
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#0EA5E9",
    backgroundColor: "#ecfeff",
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginTop: 12
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 6,
    paddingHorizontal: 4
  },
  colPos: { width: "8%" },
  colDesc: { width: "46%" },
  colQty: { width: "14%", textAlign: "right" },
  colPrice: { width: "16%", textAlign: "right" },
  colTotal: { width: "16%", textAlign: "right" },
  totalBox: {
    marginTop: 10,
    alignSelf: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
    paddingTop: 8,
    minWidth: 210
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    fontWeight: 700
  },
  notice: {
    marginTop: 12,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0EA5E9",
    backgroundColor: "#ecfeff"
  },
  footer: {
    marginTop: 26,
    fontSize: 9,
    color: "#475569"
  }
});

export const InvoicePDFDocument = ({
  invoice,
  customer,
  profile
}: {
  invoice: Invoice;
  customer: Customer;
  profile: BusinessProfile;
}) => {
  const dueDate = invoice.dueDate
    ? new Date(invoice.dueDate)
    : new Date(new Date(invoice.date).setDate(new Date(invoice.date).getDate() + 14));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.senderCompany}>{INVOICE_COMPANY_NAME}</Text>
            <Text style={styles.senderAddress}>{profile.companyAddress.replace(/\n/g, ", ")}</Text>
          </View>
          <View style={styles.logoWrap}>
            <Svg viewBox="0 0 250 250" width={76} height={52}>
              <Path d="m201.1 117.7-17.13 2.81c-5.85 0-26.05-8.78-56.78-11.09-26.27-1.37-48.43 4.49-62.72 12.78 12.16 0.75 22.71 1.91 36.86 3.05 20.91 1.65 43.12 0.3 64.03-3.58-14.63 6.45-32.3 9.22-57.54 9.01-11.04-0.09-31.29-1.96-47.55-2.96-17.34-1.55-35.2 1.48-54.9 12.75 10.65-12.7 25.53-18.34 50.13-18.65 18.26-10.7 38.72-18.45 65.34-18.45 21.28 0 35.9 4.88 56.05 10.03 8.84 2.67 15 4.03 24.21 4.3z" fill="#1f2937" />
              <Path d="m213 94.65 5.61 24.54 26.08 5.58-26.28 5.54-5.41 24.75-5.21-24.75-25.05-5.43 24.85-5.89 5.41-24.34z" fill="#1f2937" />
            </Svg>
          </View>
        </View>

        <View style={styles.addressBlock}>
          <Text>{customer.name}</Text>
          <Text>{customer.address}</Text>
        </View>

        <View style={styles.metaBlock}>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Rechnungsnummer</Text>
            <Text>{invoice.invoiceNumber}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Rechnungsdatum</Text>
            <Text>{formatDate(new Date(invoice.date))}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Fälligkeit</Text>
            <Text>{`${formatDate(dueDate)} (14 Tage nach Erhalt)`}</Text>
          </View>
        </View>

        <Text style={styles.title}>RECHNUNG</Text>
        <Text>{`Betreff: ${invoice.subject}`}</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.colPos}>Pos.</Text>
          <Text style={styles.colDesc}>Leistung</Text>
          <Text style={styles.colQty}>Menge</Text>
          <Text style={styles.colPrice}>Preis</Text>
          <Text style={styles.colTotal}>Gesamt</Text>
        </View>

        {invoice.items.map((item, index) => (
          <View style={styles.tableRow} key={`${invoice.id}-${index}`}>
            <Text style={styles.colPos}>{index + 1}</Text>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colQty}>{item.quantity.toFixed(2)}</Text>
            <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
            <Text style={styles.colTotal}>{formatCurrency(item.quantity * item.unitPrice)}</Text>
          </View>
        ))}

        <View style={styles.totalBox}>
          <View style={styles.totalLine}>
            <Text>Gesamtbetrag</Text>
            <Text>{formatCurrency(invoice.totalAmount)}</Text>
          </View>
        </View>

        {invoice.kleinunternehmer ? (
          <View style={styles.notice}>
            <Text>Gemäß §19 UStG keine USt-Ausweisung.</Text>
          </View>
        ) : null}

        {invoice.notes ? <Text style={{ marginTop: 12 }}>{invoice.notes}</Text> : null}

        <Text style={styles.footer}>
          {`${INVOICE_COMPANY_NAME} | ${profile.companyAddress.replace(/\n/g, ", ")} | ${profile.email}`}
        </Text>
      </Page>
    </Document>
  );
};
