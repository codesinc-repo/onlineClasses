import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Signal, Star, CheckCircle2, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CourseActions } from "./CourseActions";
import { courses, getCourseBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.subtitle,
    openGraph: {
      title: course.title,
      description: course.subtitle,
      images: [course.thumbnail]
    }
  };
}

export default function CourseDetailPage({ params }: Params) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const totalLessons = course.curriculum.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <>
      <section className="gradient-soft">
        <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Badge variant="muted">{course.category}</Badge>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{course.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{course.rating}</span>
                <span>({course.reviews.toLocaleString()} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Signal className="h-4 w-4" /> {course.level}
              </span>
              <span>·</span>
              <span>{totalLessons} lessons</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">{course.instructor.name}</div>
                <div className="text-xs text-muted-foreground">{course.instructor.role}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-soft">
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <Image src={course.thumbnail} alt={course.title} fill sizes="400px" className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-primary shadow-lg">
                    <PlayCircle className="h-7 w-7" />
                  </span>
                </div>
              </div>
              <CardContent className="space-y-4 p-6">
                <div>
                  <div className="text-3xl font-bold">{formatCurrency(course.price)}</div>
                  <div className="text-xs text-muted-foreground">One-time payment · lifetime access</div>
                </div>
                <CourseActions courseId={course.id} />
                <ul className="space-y-2 pt-2 text-sm text-muted-foreground">
                  {[
                    `${course.duration} on-demand content`,
                    "Downloadable resources",
                    "Certificate of completion",
                    "30-day money-back guarantee"
                  ].map((f) => (
                    <li key={f} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">About this course</h2>
              <p className="mt-3 text-muted-foreground">{course.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What you'll learn</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Curriculum</h2>
              <div className="mt-4 space-y-3">
                {course.curriculum.map((module, idx) => (
                  <Accordion
                    key={idx}
                    defaultValue={idx === 0 ? `m${idx}` : undefined}
                    items={[
                      {
                        value: `m${idx}`,
                        title: (
                          <span className="flex items-center gap-3">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {idx + 1}
                            </span>
                            {module.title}
                            <span className="ml-auto text-xs font-normal text-muted-foreground">
                              {module.lessons.length} lessons
                            </span>
                          </span>
                        ),
                        content: (
                          <ul className="space-y-2">
                            {module.lessons.map((l) => (
                              <li
                                key={l.id}
                                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <PlayCircle className="h-4 w-4 text-primary" />
                                  {l.title}
                                </span>
                                <span className="text-xs text-muted-foreground">{l.duration}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      }
                    ]}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold">Your instructor</h3>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{course.instructor.name}</div>
                    <div className="text-xs text-muted-foreground">{course.instructor.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Senior practitioner with a long track record of shipping real work and teaching
                  others how to do the same.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
