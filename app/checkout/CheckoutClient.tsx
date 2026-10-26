"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/components/providers/CartProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { getCourseById } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/lib/types";

export function CheckoutClient() {
  const router = useRouter();
  const cart = useCart();
  const { addOrder, addPurchase, isLoaded } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = React.useState(false);

  const items = cart.items
    .map((id) => getCourseById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseById>>[];
  const subtotal = items.reduce((s, c) => s + c.price, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  if (isLoaded && items.length === 0 && !processing) {
    return (
      <section className="section">
        <div className="container">
          <Card className="mx-auto max-w-xl text-center">
            <CardContent className="p-10">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-muted">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Your cart is empty</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Add a course before heading to checkout.
              </p>
              <Link href="/courses">
                <Button className="mt-6">Browse courses</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const order: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      items: items.map((c) => ({ courseId: c.id, title: c.title, price: c.price })),
      total,
      status: "Paid",
      paymentLast4: "4242"
    };
    addOrder(order);
    addPurchase(items.map((c) => c.id));
    cart.clear();
    toast({ variant: "success", title: "Payment successful", description: `Order ${order.id} confirmed.` });
    router.push(`/checkout/success?order=${order.id}`);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="muted">Checkout</Badge>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Secure checkout</h1>
          </div>
          <Badge variant="accent" className="gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Test mode · No real payment
          </Badge>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <form onSubmit={pay} className="space-y-6 lg:col-span-3">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-lg font-semibold">Contact details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" defaultValue="Alex Morgan" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Payment</h2>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" /> Secured by Stripe (demo)
                  </div>
                </div>
                <div className="mt-5 grid gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="card">Card number</Label>
                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="card" className="pl-10" defaultValue="4242 4242 4242 4242" required />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="exp">Expiry</Label>
                      <Input id="exp" defaultValue="12/28" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" defaultValue="123" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="zip">ZIP</Label>
                      <Input id="zip" defaultValue="10001" required />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Any card number works. In production this would be handled by Stripe or PayPal — no card
                  data ever touches our servers.
                </p>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={processing}>
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing payment…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pay {formatCurrency(total)}
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              <CheckCircle2 className="mr-1 inline h-3 w-3 text-emerald-500" />
              30-day money-back guarantee · Lifetime access to purchased courses
            </p>
          </form>

          <aside className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-base font-semibold">Order summary</h2>
                <ul className="mt-4 space-y-4">
                  {items.map((c) => (
                    <li key={c.id} className="flex items-center gap-3">
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={c.thumbnail} alt={c.title} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="line-clamp-1 text-sm font-medium">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.category}</p>
                      </div>
                      <div className="text-sm font-semibold">{formatCurrency(c.price)}</div>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd>{formatCurrency(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tax (est.)</dt>
                    <dd>{formatCurrency(tax)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                    <dt>Total</dt>
                    <dd>{formatCurrency(total)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}
