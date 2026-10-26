"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "./providers/CartProvider";
import { getCourseById } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, remove } = useCart();
  const courses = items
    .map((id) => getCourseById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseById>>[];
  const total = courses.reduce((sum, c) => sum + c.price, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} title="Your cart">
      <div className="flex h-full flex-col">
        {courses.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-muted">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Browse the catalog and add a course to continue.
            </p>
            <Link href="/courses" onClick={() => setIsOpen(false)}>
              <Button className="mt-2">Browse courses</Button>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border px-5">
              {courses.map((c) => (
                <li key={c.id} className="flex gap-3 py-4">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={c.thumbnail}
                      alt={c.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Badge variant="muted" className="w-fit">{c.category}</Badge>
                    <p className="mt-1 line-clamp-2 text-sm font-medium">{c.title}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-semibold">{formatCurrency(c.price)}</span>
                      <button
                        type="button"
                        onClick={() => remove(c.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${c.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border bg-muted/40 p-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-base font-semibold">{formatCurrency(total)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full" size="lg">
                  Continue to checkout
                </Button>
              </Link>
              <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-muted-foreground">
                Test mode · No real payment
              </p>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}
