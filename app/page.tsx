import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  PenTool,
  Users,
  Presentation,
  Star,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { CourseCard } from "@/components/CourseCard";
import { services, testimonials, faqs, getFeaturedCourses } from "@/lib/data";
import { brand } from "@/lib/brand";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  PenTool,
  Users,
  Presentation
};

export default function HomePage() {
  const featured = getFeaturedCourses();

  return (
    <>
      <section className="relative overflow-hidden gradient-soft">
        <div className="container pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="default" className="mb-5 gap-1">
                <Sparkles className="h-3 w-3" /> New: Design systems cohort
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Services and online training that <span className="text-primary">actually</span> move the needle.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                {brand.description} Learn from practitioners, ship real work and get the support of a mentor.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/courses">
                  <Button size="lg" className="gap-2">
                    Browse courses <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    See services & pricing
                  </Button>
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {["Lifetime access", "Project-based", "Mentor support"].map((f) => (
                  <li key={f} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=70"
                  alt="Team collaborating on a laptop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-card p-4 shadow-soft md:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">30-day guarantee</div>
                    <div className="text-xs text-muted-foreground">Not for you? Full refund.</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-4 hidden rounded-2xl bg-card p-4 shadow-soft md:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">+12,000 learners</div>
                    <div className="text-xs text-muted-foreground">Trust our training</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8 text-sm text-muted-foreground">
          <span className="font-medium">Trusted by teams at</span>
          {["Northwind", "Finbox", "Looplab", "Helios", "Monad"].map((n) => (
            <span key={n} className="font-semibold tracking-wide opacity-70">{n}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <Badge variant="muted">Services</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Hands-on help, not just videos.
            </h2>
            <p className="mt-3 text-muted-foreground">
              From team workshops to 1:1 mentorship, we meet you where you are and get you to where you want to be.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon] ?? GraduationCap;
              return (
                <Card key={s.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription className="mt-2">{s.description}</CardDescription>
                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      {s.bullets.map((b) => (
                        <li key={b} className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" className="gap-2">
                See services & pricing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <Badge variant="muted">Featured courses</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Learn from practitioners who ship.
              </h2>
            </div>
            <Link href="/courses" className="hidden sm:inline-flex">
              <Button variant="ghost" className="gap-2">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <Badge variant="muted">Testimonials</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              A reputation built on outcomes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Badge variant="muted">FAQ</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Questions, answered.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Not finding what you need? Reach out from the contact page and we'll get back within one business day.
            </p>
          </div>
          <div className="lg:col-span-3">
            <Accordion
              defaultValue="q0"
              items={faqs.map((f, i) => ({
                value: `q${i}`,
                title: f.q,
                content: <p>{f.a}</p>
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 text-white md:p-14">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to level up your team?
              </h2>
              <p className="mt-3 text-white/85">
                Start with a free preview — try the student experience with one click, no account needed.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/login">
                  <Button size="lg" variant="accent">
                    Try the demo
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white/20">
                    Talk to us
                  </Button>
                </Link>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
