import type { Metadata } from "next";
import { services, pricing } from "@/lib/data";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Services, workshops, consulting and a simple 3-tier pricing structure."
};

export default function ServicesPage() {
  return <ServicesClient services={services} pricing={pricing} />;
}
