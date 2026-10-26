import type { Metadata } from "next";
import { ForgotClient } from "./ForgotClient";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your demo student password."
};

export default function ForgotPasswordPage() {
  return <ForgotClient />;
}
