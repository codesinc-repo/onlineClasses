"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Lock, Play, ShoppingCart } from "lucide-react";

export function CourseActions({ courseId }: { courseId: string }) {
  const router = useRouter();
  const cart = useCart();
  const { purchases, isLoaded } = useAuth();
  const { toast } = useToast();

  const owned = isLoaded && purchases.includes(courseId);
  const inCart = cart.has(courseId);

  if (owned) {
    return (
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <Check className="h-3.5 w-3.5" /> You own this course
        </div>
        <Link href={`/account/learn/${courseId}`} className="block">
          <Button className="w-full gap-2" size="lg">
            <Play className="h-4 w-4" /> Start learning
          </Button>
        </Link>
      </div>
    );
  }

  const addToCart = () => {
    cart.add(courseId);
    toast({
      variant: "success",
      title: "Added to cart",
      description: "Open the cart to continue to checkout."
    });
  };

  const buyNow = () => {
    cart.add(courseId);
    router.push("/checkout");
  };

  return (
    <div className="space-y-2">
      <Button className="w-full gap-2" size="lg" onClick={buyNow}>
        <Lock className="h-4 w-4" /> Buy now
      </Button>
      <Button
        className="w-full gap-2"
        variant="outline"
        size="lg"
        onClick={addToCart}
        disabled={inCart}
      >
        <ShoppingCart className="h-4 w-4" />
        {inCart ? "In cart" : "Add to cart"}
      </Button>
    </div>
  );
}
