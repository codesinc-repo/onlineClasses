"use client";

import * as React from "react";
import {
  Check,
  GraduationCap,
  PenTool,
  Users,
  Presentation,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/providers/ToastProvider";
import { formatCurrency } from "@/lib/utils";
import type { PricingTier, Service } from "@/lib/types";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  PenTool,
  Users,
  Presentation
};

export function ServicesClient({
  services,
  pricing
}: {
  services: Service[];
  pricing: PricingTier[];
}) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const { toast } = useToast();

  const openEnquiry = (name: string) => {
    setSubject(name);
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setOpen(false);
    toast({
      variant: "success",
      title: "Enquiry sent",
      description: "Thanks — we'll follow up within one business day."
    });
  };

  return (
    <>
      <section className="gradient-soft">
        <div className="container py-16 md:py-24">
          <Badge variant="muted">Services & Pricing</Badge>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Pick the engagement that fits your team.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            From one-off workshops to ongoing mentorship, every service is scoped around a clear outcome and
            delivered by senior practitioners.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => {
              const Icon = icons[s.icon] ?? GraduationCap;
              return (
                <Card key={s.id} className="card-hover">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                          {s.bullets.map((b) => (
                            <li key={b} className="inline-flex items-center gap-2 text-muted-foreground">
                              <Check className="h-4 w-4 text-emerald-500" /> {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5">
                          <Button variant="outline" onClick={() => openEnquiry(s.title)}>
                            Book / Enquire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="muted">Simple pricing</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Transparent plans. Cancel anytime.
            </h2>
            <p className="mt-3 text-muted-foreground">
              No contracts, no hidden fees. All plans include access to our full self-paced catalog.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricing.map((tier) => (
              <Card
                key={tier.id}
                className={`relative card-hover ${
                  tier.featured ? "ring-2 ring-primary border-primary/20" : ""
                }`}
              >
                {tier.featured && (
                  <Badge
                    variant="accent"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1"
                  >
                    <Sparkles className="h-3 w-3" /> Most popular
                  </Badge>
                )}
                <CardContent className="p-6 md:p-8">
                  <div className="text-sm font-medium text-muted-foreground">{tier.name}</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {formatCurrency(tier.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="inline-flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={tier.featured ? "default" : "outline"}
                    onClick={() => openEnquiry(`${tier.name} plan`)}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`Enquire about ${subject || "a service"}`}
        description="Tell us a little about your team and we'll be in touch within one business day."
      >
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="e-name">Your name</Label>
              <Input id="e-name" defaultValue="Alex Morgan" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-email">Email</Label>
              <Input id="e-email" type="email" defaultValue="alex@example.com" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="e-company">Company</Label>
              <Input id="e-company" defaultValue="Acme Co." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-size">Team size</Label>
              <Input id="e-size" defaultValue="8 engineers" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="e-message">Message</Label>
            <Textarea
              id="e-message"
              rows={4}
              defaultValue={`Hi — we're interested in ${subject || "your services"} for our team. When could we talk?`}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting} size="lg">
            {submitting ? "Sending…" : "Send enquiry"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Demo mode: no message is actually sent.</p>
        </form>
      </Dialog>
    </>
  );
}
