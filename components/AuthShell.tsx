import Link from "next/link";
import { Logo } from "./Logo";
import { Badge } from "./ui/badge";

export function AuthShell({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden gradient-soft">
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <Badge variant="muted">Demo mode</Badge>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
          {footer && (
            <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo mode: no real accounts are created.{" "}
            <Link href="/" className="underline hover:text-foreground">Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
