"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

export function CoursesClient({
  courses,
  categories
}: {
  courses: Course[];
  categories: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | "All">("All");
  const [sort, setSort] = React.useState<SortKey>("popular");

  const filtered = React.useMemo(() => {
    let list = courses.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q);
      const matchesCat = category === "All" || c.category === category;
      return matchesQ && matchesCat;
    });
    switch (sort) {
      case "newest":
        list = [...list].reverse();
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [query, category, sort, courses]);

  return (
    <>
      <section className="gradient-soft">
        <div className="container py-14 md:py-20">
          <Badge variant="muted">Catalog</Badge>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Explore the full course catalog.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Project-based courses across design, engineering and business — taught by practitioners you can learn from.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search courses"
                placeholder="Search by title, topic or instructor…"
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="sort-select">Sort</label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 rounded-full border border-border bg-background px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="popular">Most popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={cat === category ? "default" : "outline"}
                onClick={() => setCategory(cat as string)}
                className={cn("rounded-full")}
              >
                {cat}
              </Button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No courses match your filters. Try clearing the search.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
