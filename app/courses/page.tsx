import type { Metadata } from "next";
import { courses, categories } from "@/lib/data";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = {
  title: "Online Courses",
  description: "Browse the full course catalog. Search, filter and sort to find your next course."
};

export default function CoursesPage() {
  return <CoursesClient courses={courses} categories={[...categories]} />;
}
