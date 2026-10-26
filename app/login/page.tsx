import type { Metadata } from "next";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the demo student account."
};

export default function LoginPage() {
  return <LoginClient />;
}
