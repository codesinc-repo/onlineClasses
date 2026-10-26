"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Sparkles } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "At least 4 characters")
});
type FormValues = z.infer<typeof schema>;

export function LoginClient() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "demo@student.com", password: "demo1234" }
  });

  const demoSignIn = () => {
    signIn();
    toast({ variant: "success", title: "Welcome, Demo Student", description: "You're signed in." });
    router.push("/account");
  };

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    demoSignIn();
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your student dashboard."
      footer={
        <>
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <div className="mb-5 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3 text-xs">
        <div className="font-semibold text-primary">Demo credentials</div>
        <div className="mt-0.5 text-muted-foreground">
          demo@student.com · demo1234 (already pre-filled)
        </div>
      </div>

      <Button
        type="button"
        className="w-full gap-2"
        size="lg"
        variant="accent"
        onClick={demoSignIn}
      >
        <Sparkles className="h-4 w-4" />
        Continue as Demo Student
      </Button>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or sign in with any credentials
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" className="pl-10" {...register("email")} />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" className="pl-10" {...register("password")} />
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
        <div className="text-center">
          <Badge variant="muted">Any input works — this is a demo</Badge>
        </div>
      </form>
    </AuthShell>
  );
}
