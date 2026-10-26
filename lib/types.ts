export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  resources?: { label: string; href: string }[];
}

export interface CurriculumModule {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  description: string;
  highlights: string[];
  curriculum: CurriculumModule[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  items: { courseId: string; title: string; price: number }[];
  total: number;
  status: "Paid" | "Refunded" | "Pending";
  paymentLast4: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
