import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container mx-auto max-w-xl text-center">
        <div className="text-6xl font-bold text-primary">404</div>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link href="/">
          <Button className="mt-6">Back to home</Button>
        </Link>
      </div>
    </section>
  );
}
