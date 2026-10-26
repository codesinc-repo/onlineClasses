"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Trophy, Clock, Bookmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/AuthProvider";
import { courses, getCourseById } from "@/lib/data";

export function DashboardClient() {
  const { student, purchases, progress } = useAuth();

  const purchased = purchases
    .map((id) => getCourseById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseById>>[];

  const progressPct = (course: NonNullable<ReturnType<typeof getCourseById>>) => {
    const total = course.curriculum.reduce((s, m) => s + m.lessons.length, 0);
    const done = (progress[course.id] ?? []).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const recommended = courses.filter((c) => !purchases.includes(c.id)).slice(0, 3);

  return (
    <>
      <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              {student.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick up where you left off, or explore something new.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatPill icon={Bookmark} label="Enrolled" value={purchased.length} />
            <StatPill icon={Trophy} label="Completed" value={purchased.filter((c) => progressPct(c) >= 100).length} />
            <StatPill
              icon={Clock}
              label="In progress"
              value={purchased.filter((c) => progressPct(c) > 0 && progressPct(c) < 100).length}
            />
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">My courses</h2>
          <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
            Browse more
          </Link>
        </div>
        {purchased.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                You don't have any courses yet. Browse the catalog to get started.
              </p>
              <Link href="/courses">
                <Button className="mt-4">Browse courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {purchased.map((c) => {
              const pct = progressPct(c);
              return (
                <Card key={c.id} className="card-hover overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image src={c.thumbnail} alt={c.title} fill sizes="500px" className="object-cover" />
                    <Badge
                      variant="default"
                      className="absolute left-3 top-3 bg-white/90 text-primary"
                    >
                      {c.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="line-clamp-1 text-base font-semibold">{c.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{c.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{pct}% complete</span>
                      <span>{c.duration}</span>
                    </div>
                    <Progress value={pct} className="mt-2" />
                    <Link href={`/account/learn/${c.id}`} className="mt-4 block">
                      <Button className="w-full gap-2" size="sm">
                        <Play className="h-4 w-4" />
                        {pct > 0 ? "Continue learning" : "Start learning"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended for you</h2>
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <Card key={c.id} className="card-hover overflow-hidden">
              <Link href={`/courses/${c.slug}`}>
                <div className="relative aspect-[16/9] bg-muted">
                  <Image src={c.thumbnail} alt={c.title} fill sizes="400px" className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="muted">{c.category}</Badge>
                  <h3 className="mt-2 line-clamp-1 text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.subtitle}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

function StatPill({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/50 px-3 py-2.5 text-center">
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="mt-1 text-lg font-semibold leading-none">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
