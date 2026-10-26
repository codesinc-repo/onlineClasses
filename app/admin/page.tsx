import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin preview",
  description: "A demo admin dashboard to show what content management looks like."
};

export default function AdminPage() {
  return <AdminClient courses={courses} />;
}
