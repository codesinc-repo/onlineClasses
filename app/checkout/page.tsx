import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout — no real payment is processed."
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
