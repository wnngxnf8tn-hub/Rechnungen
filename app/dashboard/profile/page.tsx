"use client";

import { ProfileForm } from "@/components/invoice/profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function ProfilePage() {
  const profile = useAppStore((state) => state.profile);

  return (
    <div className="space-y-7">
      <Card>
        <CardHeader>
          <CardTitle>Rechnungssteller-Daten</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm defaultValues={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
