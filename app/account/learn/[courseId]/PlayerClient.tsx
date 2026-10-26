"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  PlayCircle,
  FileText,
  Download,
  Lock,
  BookOpen,
  Clipboard,
  NotebookPen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { Course, Lesson } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PlayerClient({ course }: { course: Course }) {
  const { purchases, progress, toggleLessonComplete, isLoaded } = useAuth();
  const { toast } = useToast();

  const allLessons: Lesson[] = course.curriculum.flatMap((m) => m.lessons);
  const [currentId, setCurrentId] = React.useState(allLessons[0]?.id);
  const [notes, setNotes] = React.useState("");

  const owned = isLoaded && purchases.includes(course.id);
  const done = progress[course.id] ?? [];
  const pct = allLessons.length === 0 ? 0 : Math.round((done.length / allLessons.length) * 100);

  const current = allLessons.find((l) => l.id === currentId) ?? allLessons[0];
  const isDone = current ? done.includes(current.id) : false;

  const notesKey = `demoNotes:${course.id}:${current?.id}`;
  React.useEffect(() => {
    if (!current) return;
    const saved = localStorage.getItem(notesKey);
    setNotes(saved ?? "");
  }, [notesKey, current]);

  const saveNotes = (val: string) => {
    setNotes(val);
    localStorage.setItem(notesKey, val);
  };

  if (!owned) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <CardContent className="p-10">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">This course is locked</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enroll to unlock {course.title} and all its lessons.
          </p>
          <Link href={`/courses/${course.slug}`}>
            <Button className="mt-6">Unlock course</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="muted">{course.category}</Badge>
            <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{course.title}</h1>
          </div>
          <div className="min-w-[160px]">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <Progress value={pct} className="mt-1.5" />
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-slate-900 shadow-sm">
          {current?.videoUrl && (
            <video
              key={current.id}
              className="h-full w-full bg-black"
              src={current.videoUrl}
              controls
              poster={course.thumbnail}
              aria-label={current.title}
            />
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">Now playing</div>
            <h2 className="text-lg font-semibold">{current?.title}</h2>
          </div>
          <Button
            variant={isDone ? "secondary" : "default"}
            className="gap-2"
            onClick={() => {
              if (!current) return;
              toggleLessonComplete(course.id, current.id);
              toast({
                variant: "success",
                title: isDone ? "Marked as not complete" : "Lesson completed",
                description: current.title
              });
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isDone ? "Marked complete" : "Mark as complete"}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-5">
            <Card>
              <CardContent className="space-y-3 p-6">
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-4 w-4" /> {current?.duration} · {course.level}
                </div>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resources" className="mt-5">
            <Card>
              <CardContent className="p-6">
                {current?.resources?.length ? (
                  <ul className="divide-y divide-border">
                    {current.resources.map((r) => (
                      <li key={r.href} className="flex items-center justify-between py-3">
                        <span className="inline-flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-primary" />
                          {r.label}
                        </span>
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                          <a href={r.href} download>
                            <Download className="h-4 w-4" /> Download
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No downloadable resources for this lesson.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="mt-5">
            <Card>
              <CardContent className="p-6">
                <div className="mb-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <NotebookPen className="h-4 w-4" /> Your notes for this lesson (saved locally)
                </div>
                <Textarea
                  rows={6}
                  placeholder="Jot down your takeaways…"
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <aside>
        <Card className="lg:sticky lg:top-24">
          <CardContent className="p-0">
            <div className="border-b border-border p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold">
                <Clipboard className="h-4 w-4 text-primary" /> Curriculum
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {done.length} of {allLessons.length} lessons complete
              </div>
            </div>
            <div className="max-h-[520px] overflow-y-auto">
              {course.curriculum.map((module, idx) => (
                <div key={idx} className="border-b border-border last:border-b-0">
                  <div className="bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {module.title}
                  </div>
                  <ul>
                    {module.lessons.map((l) => {
                      const active = current?.id === l.id;
                      const complete = done.includes(l.id);
                      return (
                        <li key={l.id}>
                          <button
                            type="button"
                            onClick={() => setCurrentId(l.id)}
                            className={cn(
                              "flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors",
                              active ? "bg-primary/5" : "hover:bg-muted"
                            )}
                            aria-current={active}
                          >
                            {complete ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                            ) : (
                              <PlayCircle
                                className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")}
                              />
                            )}
                            <span className={cn("flex-1", active && "font-medium text-primary")}>
                              {l.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{l.duration}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
