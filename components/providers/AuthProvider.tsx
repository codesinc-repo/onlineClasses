"use client";

/**
 * DEMO-ONLY auth. No real authentication, no password checking.
 * Signs in with a single localStorage flag.
 */
import * as React from "react";
import { demoStudent, defaultPurchasedCourseIds, demoOrders } from "@/lib/data";
import type { Order, Student } from "@/lib/types";

const AUTH_KEY = "isDemoUser";
const PROFILE_KEY = "demoProfile";
const PURCHASES_KEY = "demoPurchases";
const ORDERS_KEY = "demoOrders";
const PROGRESS_KEY = "demoProgress";

interface AuthContextValue {
  isSignedIn: boolean;
  student: Student;
  purchases: string[];
  orders: Order[];
  progress: Record<string, string[]>;
  signIn: () => void;
  signOut: () => void;
  updateProfile: (partial: Partial<Student>) => void;
  addOrder: (order: Order) => void;
  addPurchase: (courseIds: string[]) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  isLoaded: boolean;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [student, setStudent] = React.useState<Student>(demoStudent);
  const [purchases, setPurchases] = React.useState<string[]>([...defaultPurchasedCourseIds]);
  const [orders, setOrders] = React.useState<Order[]>(demoOrders);
  const [progress, setProgress] = React.useState<Record<string, string[]>>({});
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsSignedIn(localStorage.getItem(AUTH_KEY) === "true");
      const prof = localStorage.getItem(PROFILE_KEY);
      if (prof) setStudent(JSON.parse(prof));
      const pur = localStorage.getItem(PURCHASES_KEY);
      setPurchases(pur ? JSON.parse(pur) : [...defaultPurchasedCourseIds]);
      const ord = localStorage.getItem(ORDERS_KEY);
      setOrders(ord ? JSON.parse(ord) : demoOrders);
      const prog = localStorage.getItem(PROGRESS_KEY);
      setProgress(prog ? JSON.parse(prog) : {});
    } catch {}
    setIsLoaded(true);
  }, []);

  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  const signIn = () => {
    localStorage.setItem(AUTH_KEY, "true");
    setIsSignedIn(true);
    if (!localStorage.getItem(PURCHASES_KEY)) {
      persist(PURCHASES_KEY, [...defaultPurchasedCourseIds]);
    }
    if (!localStorage.getItem(ORDERS_KEY)) {
      persist(ORDERS_KEY, demoOrders);
    }
    if (!localStorage.getItem(PROFILE_KEY)) {
      persist(PROFILE_KEY, demoStudent);
    }
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsSignedIn(false);
  };

  const updateProfile = (partial: Partial<Student>) => {
    const next = { ...student, ...partial };
    setStudent(next);
    persist(PROFILE_KEY, next);
  };

  const addOrder = (order: Order) => {
    const next = [order, ...orders];
    setOrders(next);
    persist(ORDERS_KEY, next);
  };

  const addPurchase = (courseIds: string[]) => {
    const merged = Array.from(new Set([...purchases, ...courseIds]));
    setPurchases(merged);
    persist(PURCHASES_KEY, merged);
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    const current = progress[courseId] ?? [];
    const next = current.includes(lessonId)
      ? current.filter((x) => x !== lessonId)
      : [...current, lessonId];
    const merged = { ...progress, [courseId]: next };
    setProgress(merged);
    persist(PROGRESS_KEY, merged);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        student,
        purchases,
        orders,
        progress,
        signIn,
        signOut,
        updateProfile,
        addOrder,
        addPurchase,
        toggleLessonComplete,
        isLoaded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
