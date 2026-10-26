import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Target, Compass, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "./ContactForm";
import { team } from "@/lib/data";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} is on a mission to help teams and individuals grow through modern training.`
};

const values = [
  {
    icon: Target,
    title: "Outcome-first",
    description: "We measure success by what you ship after the course — not just hours watched."
  },
  {
    icon: Compass,
    title: "Practitioner-led",
    description: "Every course is built and taught by someone doing the work in production right now."
  },
  {
    icon: HeartHandshake,
    title: "Human support",
    description: "You get access to real mentors who'll answer your questions in days, not months."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="gradient-soft">
        <div className="container py-16 md:py-24">
          <Badge variant="muted">About us</Badge>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            We're building the training we wish we had early in our careers.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            {brand.name} started with a simple idea: training should be practical, honest and taught by
            people who actually ship. We help teams and individuals grow by combining great content with
            real human mentorship.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="muted">Our story</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A decade of helping teams ship.</h2>
            <p className="mt-4 text-muted-foreground">
              We've trained engineering, design and growth teams at startups and public companies.
              Over the years we've learned what works — short cycles, project-based learning, real
              mentors, and brutally honest feedback. That philosophy sits at the heart of everything
              we offer.
            </p>
            <p className="mt-3 text-muted-foreground">
              Today we support thousands of learners through a mix of self-paced courses, cohort
              programs and services, all designed to produce measurable outcomes.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=70"
              alt="A team working together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <Badge variant="muted">Our values</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">What we stand for.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <Badge variant="muted">Team</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Meet the people behind {brand.shortName}.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Card key={m.name} className="card-hover overflow-hidden">
                <div className="relative aspect-square bg-muted">
                  <Image src={m.avatar} alt={m.name} fill sizes="300px" className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <div className="text-base font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-muted/40">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="muted">Contact</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Say hello.</h2>
            <p className="mt-3 text-muted-foreground">
              Have a question about courses, services or your team's training needs? Fill the form
              and we'll be in touch within one business day.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="inline-flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                {brand.email}
              </li>
              <li className="inline-flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                {brand.phone}
              </li>
              <li className="inline-flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                {brand.address}
              </li>
            </ul>
          </div>
          <Card>
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
