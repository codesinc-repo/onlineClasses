import type {
  Course,
  Service,
  PricingTier,
  Testimonial,
  FAQ,
  TeamMember,
  Order,
  Student
} from "./types";

export const categories = ["Design", "Development", "Business"] as const;
export type Category = (typeof categories)[number];

const sampleVideo =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const resources = [
  { label: "Starter workbook (PDF)", href: "#" },
  { label: "Resource bundle (ZIP)", href: "#" },
  { label: "Cheat sheet (PDF)", href: "#" }
];

function buildLessons(prefix: string, count: number) {
  const titles = [
    "Welcome and course overview",
    "Setting up your workspace",
    "Core concepts you must know",
    "Hands-on: your first project",
    "Advanced patterns in practice",
    "Common pitfalls and how to avoid them",
    "Real-world case study walkthrough",
    "Next steps and your action plan"
  ];
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-l${i + 1}`,
    title: titles[i] || `Lesson ${i + 1}`,
    duration: `${8 + ((i * 3) % 15)} min`,
    videoUrl: sampleVideo,
    resources: i % 2 === 0 ? resources.slice(0, 2) : undefined
  }));
}

export const courses: Course[] = [
  {
    id: "c1",
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    subtitle: "Design clear, modern interfaces users love.",
    category: "Design",
    level: "Beginner",
    duration: "6h 20m",
    price: 79,
    rating: 4.8,
    reviews: 412,
    thumbnail:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Amelia Chen",
      role: "Senior Product Designer",
      avatar: "https://i.pravatar.cc/160?img=47"
    },
    description:
      "A practical introduction to user interface and user experience design. You'll learn visual hierarchy, color, typography and usability principles — then apply them to a real product project.",
    highlights: [
      "Core design principles explained visually",
      "Build a real portfolio-ready project",
      "Figma workflow from zero to prototype",
      "Lifetime access and resource bundle"
    ],
    curriculum: [
      { title: "Getting started", lessons: buildLessons("c1-m1", 3) },
      { title: "Visual design fundamentals", lessons: buildLessons("c1-m2", 3) },
      { title: "Build and ship", lessons: buildLessons("c1-m3", 2) }
    ],
    featured: true
  },
  {
    id: "c2",
    slug: "advanced-figma-and-prototyping",
    title: "Advanced Figma & Prototyping",
    subtitle: "Build pixel-perfect designs and interactive prototypes.",
    category: "Design",
    level: "Intermediate",
    duration: "5h 40m",
    price: 99,
    rating: 4.9,
    reviews: 318,
    thumbnail:
      "https://images.unsplash.com/photo-1611784728558-6a7645e72a03?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Marcus Reed",
      role: "Design Systems Lead",
      avatar: "https://i.pravatar.cc/160?img=12"
    },
    description:
      "Go beyond the basics of Figma. Master auto-layout, variants, variables and advanced prototyping to deliver production-ready designs faster.",
    highlights: [
      "Auto-layout and components mastery",
      "Design tokens and variables",
      "Interactive prototyping techniques",
      "Hand-off that developers love"
    ],
    curriculum: [
      { title: "Auto-layout deep dive", lessons: buildLessons("c2-m1", 3) },
      { title: "Components & variants", lessons: buildLessons("c2-m2", 2) },
      { title: "Advanced prototyping", lessons: buildLessons("c2-m3", 2) }
    ]
  },
  {
    id: "c3",
    slug: "nextjs-full-stack-bootcamp",
    title: "Next.js Full-Stack Bootcamp",
    subtitle: "Ship a production-grade app end to end.",
    category: "Development",
    level: "Intermediate",
    duration: "9h 10m",
    price: 129,
    rating: 4.9,
    reviews: 1024,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Priya Shah",
      role: "Staff Engineer",
      avatar: "https://i.pravatar.cc/160?img=32"
    },
    description:
      "Learn to build and deploy a complete full-stack app with the Next.js App Router, server actions, authentication, databases and payments.",
    highlights: [
      "App Router and server components",
      "Server actions and data fetching",
      "Deploy to Vercel with zero config",
      "Real production project included"
    ],
    curriculum: [
      { title: "Project setup", lessons: buildLessons("c3-m1", 3) },
      { title: "Data and server actions", lessons: buildLessons("c3-m2", 3) },
      { title: "Auth, payments and deploy", lessons: buildLessons("c3-m3", 2) }
    ],
    featured: true
  },
  {
    id: "c4",
    slug: "typescript-for-react-developers",
    title: "TypeScript for React Developers",
    subtitle: "Write safer, more maintainable React code.",
    category: "Development",
    level: "Beginner",
    duration: "4h 30m",
    price: 69,
    rating: 4.7,
    reviews: 561,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Jonas Weber",
      role: "Frontend Architect",
      avatar: "https://i.pravatar.cc/160?img=15"
    },
    description:
      "Everything a React developer needs to be productive with TypeScript — from generics to advanced type patterns, applied directly to React apps.",
    highlights: [
      "Typing props, state and hooks",
      "Generics for reusable components",
      "Type-safe forms and APIs",
      "Migrating a JS codebase to TS"
    ],
    curriculum: [
      { title: "TypeScript essentials", lessons: buildLessons("c4-m1", 3) },
      { title: "Typing React patterns", lessons: buildLessons("c4-m2", 3) }
    ]
  },
  {
    id: "c5",
    slug: "scalable-design-systems",
    title: "Scalable Design Systems",
    subtitle: "Build and govern a design system teams love.",
    category: "Design",
    level: "Advanced",
    duration: "7h 05m",
    price: 149,
    rating: 4.8,
    reviews: 212,
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Elena Rossi",
      role: "Design Systems Director",
      avatar: "https://i.pravatar.cc/160?img=5"
    },
    description:
      "Learn how real design systems are built, documented and adopted. Covers tokens, governance, documentation and partnership with engineering.",
    highlights: [
      "Token architecture that scales",
      "Component API design",
      "Adoption and governance",
      "Working with engineering"
    ],
    curriculum: [
      { title: "Foundations and tokens", lessons: buildLessons("c5-m1", 3) },
      { title: "Components and APIs", lessons: buildLessons("c5-m2", 3) },
      { title: "Governance and adoption", lessons: buildLessons("c5-m3", 2) }
    ]
  },
  {
    id: "c6",
    slug: "data-driven-product-growth",
    title: "Data-Driven Product Growth",
    subtitle: "Turn analytics into measurable growth.",
    category: "Business",
    level: "Intermediate",
    duration: "4h 45m",
    price: 89,
    rating: 4.6,
    reviews: 274,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Daniel Okafor",
      role: "Growth Lead",
      avatar: "https://i.pravatar.cc/160?img=11"
    },
    description:
      "A practical playbook for teams who want to grow revenue and retention without guessing. Frameworks, experiments and metrics that matter.",
    highlights: [
      "North-star metrics done right",
      "Experiment design and analysis",
      "Growth loops and funnels",
      "Case studies from real teams"
    ],
    curriculum: [
      { title: "Frameworks", lessons: buildLessons("c6-m1", 3) },
      { title: "Experiments and analysis", lessons: buildLessons("c6-m2", 3) }
    ],
    featured: true
  },
  {
    id: "c7",
    slug: "modern-marketing-fundamentals",
    title: "Modern Marketing Fundamentals",
    subtitle: "Launch, measure and scale a brand online.",
    category: "Business",
    level: "Beginner",
    duration: "5h 15m",
    price: 59,
    rating: 4.5,
    reviews: 189,
    thumbnail:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Sofia Alvarez",
      role: "Marketing Strategist",
      avatar: "https://i.pravatar.cc/160?img=25"
    },
    description:
      "A complete tour of modern marketing. Positioning, channels, content, paid, SEO and measurement — in one practical course.",
    highlights: [
      "Positioning and messaging",
      "Paid, organic and content strategy",
      "SEO essentials",
      "Measurement and reporting"
    ],
    curriculum: [
      { title: "Positioning", lessons: buildLessons("c7-m1", 3) },
      { title: "Channels", lessons: buildLessons("c7-m2", 3) }
    ]
  },
  {
    id: "c8",
    slug: "cloud-devops-essentials",
    title: "Cloud & DevOps Essentials",
    subtitle: "Automate deploys, infra and observability.",
    category: "Development",
    level: "Advanced",
    duration: "8h 00m",
    price: 139,
    rating: 4.8,
    reviews: 356,
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70",
    instructor: {
      name: "Noah Kim",
      role: "DevOps Engineer",
      avatar: "https://i.pravatar.cc/160?img=68"
    },
    description:
      "Learn the DevOps toolchain used by modern engineering teams. CI/CD, infrastructure as code, observability and incident response.",
    highlights: [
      "CI/CD pipelines",
      "Infrastructure as code",
      "Monitoring and alerting",
      "Incident response"
    ],
    curriculum: [
      { title: "CI/CD", lessons: buildLessons("c8-m1", 3) },
      { title: "Infra as code", lessons: buildLessons("c8-m2", 3) },
      { title: "Observability", lessons: buildLessons("c8-m3", 2) }
    ]
  }
];

export const services: Service[] = [
  {
    id: "s1",
    title: "Team Training",
    description:
      "Live, hands-on cohort training for your team — tailored to your stack, your pace, your goals.",
    icon: "GraduationCap",
    bullets: [
      "Customized curriculum",
      "Live Q&A and office hours",
      "Project-based learning"
    ]
  },
  {
    id: "s2",
    title: "Design & UX Consulting",
    description:
      "Audits, design systems and product UX engagements that unblock product teams.",
    icon: "PenTool",
    bullets: ["UX audits", "Design systems", "Prototyping sprints"]
  },
  {
    id: "s3",
    title: "Engineering Mentorship",
    description:
      "1:1 and small-group mentorship for engineers who want to level up quickly, with structure.",
    icon: "Users",
    bullets: ["Code reviews", "Career coaching", "Interview prep"]
  },
  {
    id: "s4",
    title: "Custom Workshops",
    description:
      "Half-day or multi-day workshops delivered on-site or remotely. Practical, outcome-driven.",
    icon: "Presentation",
    bullets: ["Half or full day", "Remote or on-site", "Shared workshop recording"]
  }
];

export const pricing: PricingTier[] = [
  {
    id: "p1",
    name: "Starter",
    price: 29,
    period: "/month",
    description: "For individuals getting started.",
    features: [
      "Access to 20+ foundations courses",
      "Community access",
      "Monthly live Q&A",
      "Downloadable resources"
    ],
    cta: "Enquire"
  },
  {
    id: "p2",
    name: "Pro",
    price: 59,
    period: "/month",
    description: "For professionals leveling up.",
    features: [
      "Everything in Starter",
      "All advanced courses",
      "Weekly office hours",
      "1:1 mentor matching",
      "Certificates of completion"
    ],
    featured: true,
    cta: "Enquire"
  },
  {
    id: "p3",
    name: "Team",
    price: 199,
    period: "/month",
    description: "For teams of 5 to 25.",
    features: [
      "Everything in Pro",
      "Up to 25 seats",
      "Team analytics dashboard",
      "Custom onboarding",
      "Dedicated success manager"
    ],
    cta: "Talk to sales"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Hannah Lee",
    role: "Product Designer, Finbox",
    avatar: "https://i.pravatar.cc/120?img=49",
    quote:
      "The design systems course paid for itself in a week. Our team now ships UI 3x faster with far fewer bugs.",
    rating: 5
  },
  {
    id: "t2",
    name: "Rafael Mendes",
    role: "Engineering Lead, Northwind",
    avatar: "https://i.pravatar.cc/120?img=14",
    quote:
      "Easily the best Next.js training I've taken. Project-based, modern and genuinely practical.",
    rating: 5
  },
  {
    id: "t3",
    name: "Mira Patel",
    role: "Founder, Looplab",
    avatar: "https://i.pravatar.cc/120?img=38",
    quote:
      "We hired them for a 2-week UX sprint and shipped our redesign a month ahead of schedule.",
    rating: 5
  }
];

export const faqs: FAQ[] = [
  {
    q: "Is this a real product or a demo?",
    a: "This is a demo prototype. Course purchases and logins are simulated — no payments or real accounts are created."
  },
  {
    q: "Can I preview the course player?",
    a: "Yes. Sign in with the Demo Student and open any purchased course from your dashboard to try the full learning experience."
  },
  {
    q: "Do you offer team or enterprise plans?",
    a: "Yes. The Team tier is a starting point — custom plans are available on request from the services page."
  },
  {
    q: "How do you handle refunds in production?",
    a: "In a production version this would be handled via Stripe/PayPal and a database-backed order system. In this demo, orders are stored locally."
  },
  {
    q: "Will certificates be available?",
    a: "Yes, certificates ship with the Pro tier. In production they would be generated server-side and verifiable via URL."
  }
];

export const team: TeamMember[] = [
  {
    name: "Amelia Chen",
    role: "Head of Learning",
    bio: "Senior product designer with 10+ years at consumer and B2B companies.",
    avatar: "https://i.pravatar.cc/200?img=47"
  },
  {
    name: "Priya Shah",
    role: "Head of Engineering",
    bio: "Staff engineer. Loves React, TypeScript and shipping production-grade apps.",
    avatar: "https://i.pravatar.cc/200?img=32"
  },
  {
    name: "Daniel Okafor",
    role: "Growth Lead",
    bio: "Growth lead and product coach. Helps teams compound their wins.",
    avatar: "https://i.pravatar.cc/200?img=11"
  },
  {
    name: "Sofia Alvarez",
    role: "Brand & Marketing",
    bio: "Marketing strategist specializing in positioning for modern tech brands.",
    avatar: "https://i.pravatar.cc/200?img=25"
  }
];

export const demoStudent: Student = {
  id: "demo",
  name: "Demo Student",
  email: "demo@student.com",
  phone: "+1 (555) 000-1234",
  avatar: "https://i.pravatar.cc/160?img=59"
};

export const defaultPurchasedCourseIds = ["c1", "c3"] as const;

export const demoOrders: Order[] = [
  {
    id: "ORD-10231",
    date: "2025-09-14T10:00:00Z",
    items: [
      { courseId: "c1", title: "UI/UX Design Foundations", price: 79 },
      { courseId: "c3", title: "Next.js Full-Stack Bootcamp", price: 129 }
    ],
    total: 208,
    status: "Paid",
    paymentLast4: "4242"
  }
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}

export function getFeaturedCourses() {
  return courses.filter((c) => c.featured);
}
