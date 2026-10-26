import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{brand.description}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-foreground" href="/courses">Courses</Link></li>
              <li><Link className="hover:text-foreground" href="/services">Services & pricing</Link></li>
              <li><Link className="hover:text-foreground" href="/about">About</Link></li>
              <li><Link className="hover:text-foreground" href="/admin">Admin preview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-foreground" href="/login">Sign in</Link></li>
              <li><Link className="hover:text-foreground" href="/register">Create account</Link></li>
              <li><Link className="hover:text-foreground" href="/account">My dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" />{brand.email}</li>
              <li className="inline-flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" />{brand.phone}</li>
              <li className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" />{brand.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span>{brand.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
