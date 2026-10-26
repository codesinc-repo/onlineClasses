"use client";

import * as React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/providers/ToastProvider";

export function ForgotClient() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast({
      variant: "success",
      title: "Reset link sent",
      description: "Check your inbox (demo mode: no real email is sent)."
    });
  };

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send a reset link."
      footer={
        <>
          Back to{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" defaultValue="demo@student.com" className="pl-10" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
