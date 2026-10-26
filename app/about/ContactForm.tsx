"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/providers/ToastProvider";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  topic: z.string().min(2, "Add a short topic"),
  message: z.string().min(10, "A little more detail helps")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Alex Morgan",
      email: "alex@example.com",
      topic: "Team training enquiry",
      message: "Hi — we're a team of 8 engineers looking to level up on Next.js. Can you share availability for a Q1 cohort?"
    }
  });

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast({
      variant: "success",
      title: "Message sent",
      description: "Thanks! We'll reply within one business day."
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="topic">Topic</Label>
        <Input id="topic" {...register("topic")} />
        {errors.topic && <p className="text-xs text-destructive">{errors.topic.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">Demo mode: no email is actually sent.</p>
    </form>
  );
}
