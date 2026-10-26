import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { brand } from "@/lib/brand";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-brand-academy.vercel.app"),
  title: {
    default: `${brand.name} — Services & Online Training`,
    template: `%s — ${brand.name}`
  },
  description: brand.description,
  keywords: ["online courses", "training", "design", "development", "business"],
  openGraph: {
    title: `${brand.name} — Services & Online Training`,
    description: brand.description,
    type: "website",
    siteName: brand.name
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Services & Online Training`,
    description: brand.description
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
