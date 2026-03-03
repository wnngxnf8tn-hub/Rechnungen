"use client";

import { useState, useTransition } from "react";

import { createCustomerAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const CustomerForm = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    steuernummer: ""
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-stone-800">Neuen Kunden anlegen</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(null);

            startTransition(() => {
              const result = createCustomerAction(form);
              if (result.ok) {
                setForm({ name: "", address: "", email: "", phone: "", steuernummer: "" });
                setMessage("Kunde gespeichert.");
                return;
              }
              setMessage(result.message ?? "Fehler beim Speichern.");
            });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="name" className="text-stone-700">
                Name
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="address" className="text-stone-700">
                Adresse
              </Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-stone-700">
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-stone-700">
                Telefon
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="steuer" className="text-stone-700">
                Steuernummer (optional)
              </Label>
              <Input
                id="steuer"
                value={form.steuernummer}
                onChange={(event) => setForm((prev) => ({ ...prev, steuernummer: event.target.value }))}
              />
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Speichert..." : "Kunde speichern"}
          </Button>

          {message ? <p className="text-sm text-stone-600">{message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
};
