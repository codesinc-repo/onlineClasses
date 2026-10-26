import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCourses() {
  return (
    <section className="section">
      <div className="container">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-4 h-5 w-96" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-5">
              <Skeleton className="aspect-[16/10] w-full" />
              <Skeleton className="mt-4 h-5 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
