import type { Metadata } from "next";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thanks for your (demo) purchase."
};

export default function SuccessPage({ searchParams }: { searchParams: { order?: string } }) {
  return <SuccessClient orderId={searchParams.order} />;
}
