import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className
      )}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105"
      >
        {brand.logoMark}
      </span>
      <span className="text-base md:text-[17px]">{brand.name}</span>
    </Link>
  );
}
