"use client";

import { Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/AuthProvider";
import { formatCurrency, formatDate } from "@/lib/utils";

export function OrdersClient() {
  const { orders } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Order history</h1>
      <p className="mt-1 text-sm text-muted-foreground">All of your purchases, in one place.</p>

      {orders.length === 0 ? (
        <Card className="mt-6">
          <CardContent className="p-10 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-muted">
              <Receipt className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Order</div>
                    <div className="font-semibold">{o.id}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatDate(o.date)} · card ending {o.paymentLast4}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={o.status === "Paid" ? "success" : o.status === "Pending" ? "muted" : "default"}
                    >
                      {o.status}
                    </Badge>
                    <div className="text-base font-semibold">{formatCurrency(o.total)}</div>
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-border border-t border-border">
                  {o.items.map((item) => (
                    <li key={item.courseId} className="flex items-center justify-between py-3 text-sm">
                      <span>{item.title}</span>
                      <span className="text-muted-foreground">{formatCurrency(item.price)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
