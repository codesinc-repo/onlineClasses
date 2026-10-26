"use client";

import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/AuthProvider";
import { formatCurrency, formatDate } from "@/lib/utils";

export function SuccessClient({ orderId }: { orderId?: string }) {
  const { orders, isLoaded } = useAuth();
  const order = isLoaded ? orders.find((o) => o.id === orderId) ?? orders[0] : undefined;

  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600"
          >
            <CheckCircle2 className="h-8 w-8" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Payment successful 🎉
          </h1>
          <p className="mt-3 text-muted-foreground">
            Your courses are unlocked and ready. We've emailed you a receipt (demo).
          </p>
        </div>

        {order && (
          <Card className="mx-auto mt-10 max-w-2xl">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Order</div>
                  <div className="text-lg font-semibold">{order.id}</div>
                </div>
                <Badge variant="success">Paid</Badge>
              </div>
              <ul className="mt-5 divide-y divide-border">
                {order.items.map((item) => (
                  <li key={item.courseId} className="flex justify-between py-3 text-sm">
                    <span>{item.title}</span>
                    <span className="font-medium">{formatCurrency(item.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Paid with card ending in {order.paymentLast4} · {formatDate(order.date)}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/account">
                  <Button className="gap-2" size="lg">
                    <Sparkles className="h-4 w-4" />
                    Go to my dashboard
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" size="lg">
                    Keep browsing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
