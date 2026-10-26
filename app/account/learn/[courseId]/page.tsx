import { notFound } from "next/navigation";
import { PlayerClient } from "./PlayerClient";
import { courses, getCourseById } from "@/lib/data";

export async function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export const metadata = { title: "Learn" };

export default function LearnPage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);
  if (!course) notFound();
  return <PlayerClient course={course} />;
}
