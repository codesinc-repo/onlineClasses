import type { Metadata } from "next";
import { RegisterClient } from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a demo student account."
};

export default function RegisterPage() {
  return <RegisterClient />;
}
