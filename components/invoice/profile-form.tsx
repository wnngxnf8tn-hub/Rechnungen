"use client";

import { useState, useTransition } from "react";

import { upsertProfileAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BusinessProfile } from "@/lib/types/invoice";

export const ProfileForm = ({ defaultValues }: { defaultValues: BusinessProfile }) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState(defaultValues);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);

        startTransition(() => {
          const result = upsertProfileAction(form);
          setMessage(result.ok ? "Profil gespeichert." : "Fehler beim Speichern.");
        });
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-stone-700">E-Mail</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">Ansprechpartner</Label>
          <Input
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">Firmenname</Label>
          <Input
            value={form.companyName}
            onChange={(event) => setForm((prev) => ({ ...prev, companyName: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">Telefon</Label>
          <Input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-stone-700">Firmenadresse</Label>
          <Textarea
            value={form.companyAddress}
            onChange={(event) => setForm((prev) => ({ ...prev, companyAddress: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">Steuernummer</Label>
          <Input
            value={form.steuernummer}
            onChange={(event) => setForm((prev) => ({ ...prev, steuernummer: event.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">USt-ID</Label>
          <Input value={form.ustId} onChange={(event) => setForm((prev) => ({ ...prev, ustId: event.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">IBAN</Label>
          <Input value={form.iban} onChange={(event) => setForm((prev) => ({ ...prev, iban: event.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-stone-700">BIC</Label>
          <Input value={form.bic} onChange={(event) => setForm((prev) => ({ ...prev, bic: event.target.value }))} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={form.kleinunternehmerDefault}
          onChange={(event) => setForm((prev) => ({ ...prev, kleinunternehmerDefault: event.target.checked }))}
          className="h-4 w-4 rounded border-stone-300 accent-[#384E36]"
        />
        Standardmäßig Kleinunternehmerregelung aktivieren
      </label>

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "Speichert..." : "Profil aktualisieren"}
      </Button>

      {message ? <p className="text-sm text-stone-600">{message}</p> : null}
    </form>
  );
};
