"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, UserCircle2, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "./providers/CartProvider";
import { useAuth } from "./providers/AuthProvider";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" }
];

export function Navbar() {
  const pathname = usePathname();
  const { items, setIsOpen } = useCart();
  const { isSignedIn, isLoaded } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-muted"
          >
            <ShoppingCart className="h-4 w-4" />
            {items.length > 0 && (
              <Badge
                variant="accent"
                className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1.5 text-[10px]"
              >
                {items.length}
              </Badge>
            )}
          </button>
          {isLoaded && isSignedIn ? (
            <Link href="/account" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-2">
                <UserCircle2 className="h-4 w-4" />
                Account
              </Button>
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="default" size="sm">
                Sign in
              </Button>
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {nav.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium",
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {isSignedIn ? (
              <Link href="/account" className="rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                My account
              </Link>
            ) : (
              <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-medium text-primary hover:bg-muted">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
