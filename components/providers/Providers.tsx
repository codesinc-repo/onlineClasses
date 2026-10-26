"use client";

import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { ToastProvider } from "./ToastProvider";
import { CartDrawer } from "@/components/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
