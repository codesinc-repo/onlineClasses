"use client";

import * as React from "react";

const CART_KEY = "demoCart";
const OPEN_EVENT = "cart:open";

interface CartContextValue {
  items: string[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  add: (courseId: string) => void;
  remove: (courseId: string) => void;
  clear: () => void;
  has: (courseId: string) => boolean;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    const onOpen = () => setIsOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const persist = (next: string[]) => {
    setItems(next);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch {}
  };

  const add = (courseId: string) => {
    if (items.includes(courseId)) return;
    persist([...items, courseId]);
  };
  const remove = (courseId: string) => persist(items.filter((x) => x !== courseId));
  const clear = () => persist([]);
  const has = (courseId: string) => items.includes(courseId);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, add, remove, clear, has }}>
      {children}
    </CartContext.Provider>
  );
}
