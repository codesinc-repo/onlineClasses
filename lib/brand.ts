/**
 * Single source of truth for brand identity.
 * Change the strings below to re-brand the whole site.
 * Color tokens live in app/globals.css (CSS variables, HSL triplets).
 */
export const brand = {
  name: "Your Brand Academy",
  shortName: "YB Academy",
  tagline: "Services and online training that actually move the needle.",
  description:
    "Your Brand Academy helps teams and individuals grow with modern training, mentoring and hands-on services.",
  email: "hello@yourbrand.academy",
  phone: "+1 (555) 010-2024",
  address: "221B Example Street, Remote-First",
  socials: {
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/"
  },
  footerNote: "Demo prototype by CodesInc",
  logoMark: "YB"
} as const;

export type Brand = typeof brand;
