"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Receipt, UserCog, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "./providers/AuthProvider";
import { useToast } from "./providers/ToastProvider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", icon: Receipt },
  { href: "/account/profile", label: "Profile", icon: UserCog }
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { student, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut();
    toast({ variant: "info", title: "Signed out", description: "You've been signed out." });
    router.push("/");
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Image
            src={student.avatar}
            alt={student.name}
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{student.name}</div>
            <div className="truncate text-xs text-muted-foreground">{student.email}</div>
          </div>
        </div>
        <nav className="mt-3 flex flex-col gap-1" aria-label="Account">
          {links.map((l) => {
            const active = l.href === "/account" ? pathname === "/account" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <l.icon className="h-4 w-4" /> {l.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 inline-flex items-center gap-2.5 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </div>
    </aside>
  );
}
