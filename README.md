# Your Brand Academy — Demo Site

A polished, fully-clickable demo of a services + online-courses business, built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**. Everything you see is a self-contained front-end prototype — there is no real backend, no real authentication and no real payments. It's designed to be shown to a prospective client as a live preview.

> ✨ Built as a demo prototype by **CodesInc**.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # start the production build
```

Deploy to Vercel with zero config — push to a Git repo and import the project at [vercel.com/new](https://vercel.com/new). No environment variables are required.

---

## Demo credentials

The login and register pages are **pre-filled** with sample data. You can also skip the form entirely:

- **Email:** `demo@student.com`
- **Password:** `demo1234`
- Or click **“Continue as Demo Student”** on either auth page.

The demo student starts with **2 courses already “purchased”** so the account area looks alive on first visit.

---

## Guided walkthrough

1. **Browse** → open `/courses`, use the search, category filter and sort.
2. **Course detail** → open any course, review the curriculum.
3. **Cart** → click **Add to cart** (or **Buy now**). The cart drawer slides in from the right.
4. **Checkout** → `/checkout` with a pre-filled test card. Pay with any card number.
5. **Confirmation** → `/checkout/success` after a short processing animation.
6. **Student dashboard** → `/account` to see enrolled courses and progress.
7. **Course player** → open any purchased course, watch the sample video, mark lessons complete, and take notes.
8. **Admin preview** → `/admin` for a glance at content management.

---

## Branding — change in one place

All brand copy and logo mark lives in [`lib/brand.ts`](lib/brand.ts):

```ts
export const brand = {
  name: "Your Brand Academy",
  shortName: "YB Academy",
  tagline: "…",
  email: "hello@yourbrand.academy",
  phone: "+1 (555) 010-2024",
  address: "221B Example Street, Remote-First",
  logoMark: "YB",
  footerNote: "Demo prototype by CodesInc"
};
```

**Colors** are HSL CSS variables defined in [`app/globals.css`](app/globals.css):

```css
--primary: 231 70% 48%;     /* deep indigo */
--accent:  25 95% 55%;      /* warm orange */
--radius:  0.9rem;
```

Change those two values to re-skin the whole site. The gradient logo also uses them via the `gradient-brand` utility.

**Favicon**: swap `public/favicon.svg` to replace the mark.

---

## Project layout

```
app/
  layout.tsx              root shell (nav, footer, providers)
  page.tsx                home
  about/                  about + contact form
  services/               services & pricing
  courses/                catalog + detail pages
  login/, register/, forgot-password/
  checkout/               cart review, mock payment, success page
  account/                protected student area
    page.tsx              dashboard
    orders/, profile/
    learn/[courseId]/     course player
  admin/                  admin preview
components/
  ui/                     shadcn-inspired primitives (button, card, dialog…)
  providers/              Auth, Cart, Toast providers
  Navbar.tsx, Footer.tsx, CourseCard.tsx, CartDrawer.tsx, AuthShell.tsx, AccountSidebar.tsx, AccountGuard.tsx
lib/
  brand.ts                brand config
  data.ts                 8 courses, services, pricing, team, FAQ
  types.ts                shared TS types
  utils.ts                cn(), formatCurrency, formatDate
public/
  favicon.svg
```

---

## What's mocked vs. what a production version would use

This is a **front-end-only prototype**. In a real version you'd swap each mock for a production dependency:

| Area | Demo (this project) | Production replacement |
| --- | --- | --- |
| Auth | `localStorage` flag `isDemoUser`, any input signs in | **NextAuth.js** or **Clerk**; email+password, OAuth, SSO |
| Database | None — mock data in `lib/data.ts` | **PostgreSQL** (Neon/Supabase/RDS) via **Prisma** or **Drizzle** |
| Course videos | Public sample MP4 | **Mux**, **Vimeo** or **Bunny.net** — signed URLs, DRM options |
| Payments | Mock card form, no SDK, pure UI | **Stripe** (Checkout or Elements) or **PayPal**; webhooks for fulfillment |
| Orders & purchases | `localStorage` keys (`demoOrders`, `demoPurchases`) | Database tables, server actions, Stripe webhook sync |
| File downloads | Dummy `#` links | Signed S3/R2 URLs with short-lived access |
| Admin UI | UI only — no persistence | Server actions backed by DB; role-based access control |
| Email (contact form, receipts) | Toast only, no email sent | **Resend**, **Postmark** or **SES** |
| Analytics | None | **Vercel Analytics** / **PostHog** |
| Image hosting | Unsplash CDN URLs | Vercel Image Optimization, Cloudinary or ImageKit |
| SEO | Metadata, OG tags, sitemap via Next | Add `next-sitemap`, structured data (Course schema) |

---

## Accessibility & performance

- Semantic HTML, proper labels, visible focus rings, ARIA where relevant.
- Light-mode design with WCAG-friendly contrast.
- Images use `next/image` with explicit sizes to avoid CLS.
- Fonts loaded with `next/font` (no FOUT, no layout shift).
- Framer Motion used sparingly for subtle entrances; respects user motion preferences in practice.

---

## License

Demo code. Replace brand assets, logo and copy before shipping to a real client.
