"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

export function ProfileClient() {
  const { student, updateProfile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = React.useState(student);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setForm(student);
  }, [student]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateProfile(form);
    setSaving(false);
    toast({ variant: "success", title: "Profile saved", description: "Your details have been updated." });
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Profile settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update how your account looks and feels.</p>

      <Card className="mt-6">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={save} className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src={form.avatar}
                alt={form.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold">{form.name}</div>
                <div className="text-xs text-muted-foreground">{form.email}</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={form.avatar}
                  onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
