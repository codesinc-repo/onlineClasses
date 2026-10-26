"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Signal } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card card-hover focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="default">{course.category}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Signal className="h-3.5 w-3.5" />
            {course.level}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
            <span className="opacity-70">({course.reviews})</span>
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-snug tracking-tight group-hover:text-primary">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.subtitle}</p>
        </div>
        <div className="mt-1 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-xs text-muted-foreground">{course.instructor.name}</span>
          </div>
          <span className="text-base font-semibold text-foreground">
            {formatCurrency(course.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
