"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers/AuthProvider";
import { Skeleton } from "./ui/skeleton";

export function AccountGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/login");
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <section className="section">
        <div className="container grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-40 lg:col-span-3" />
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
