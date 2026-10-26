"use client";

import * as React from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  BookOpen,
  Receipt,
  DollarSign,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/providers/ToastProvider";
import { formatCurrency } from "@/lib/utils";
import type { Course } from "@/lib/types";

const mockStudents = [
  { name: "Demo Student", email: "demo@student.com", enrolled: 2, joined: "2024-11-20" },
  { name: "Priya Shah", email: "priya@acme.co", enrolled: 4, joined: "2025-02-11" },
  { name: "Jonas Weber", email: "jonas@monad.io", enrolled: 1, joined: "2025-04-02" },
  { name: "Hannah Lee", email: "hannah@finbox.com", enrolled: 3, joined: "2025-06-18" },
  { name: "Rafael Mendes", email: "raf@northwind.com", enrolled: 2, joined: "2025-07-29" }
];

const mockOrders = [
  { id: "ORD-10231", student: "Demo Student", total: 208, status: "Paid", date: "2025-09-14" },
  { id: "ORD-10232", student: "Priya Shah", total: 129, status: "Paid", date: "2025-09-18" },
  { id: "ORD-10233", student: "Jonas Weber", total: 69, status: "Paid", date: "2025-09-22" },
  { id: "ORD-10234", student: "Hannah Lee", total: 149, status: "Refunded", date: "2025-09-25" },
  { id: "ORD-10235", student: "Rafael Mendes", total: 198, status: "Paid", date: "2025-10-02" }
];

export function AdminClient({ courses: initial }: { courses: Course[] }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Course | null>(null);
  const [query, setQuery] = React.useState("");

  const filtered = initial.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  const totalRevenue = mockOrders.reduce((s, o) => s + (o.status === "Paid" ? o.total : 0), 0);

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (c: Course) => {
    setEditing(c);
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({
      variant: "success",
      title: editing ? "Course updated" : "Course created",
      description: "Changes saved (demo mode — not persisted)."
    });
  };

  const remove = (c: Course) => {
    toast({
      variant: "info",
      title: "Course deleted",
      description: `${c.title} removed (demo mode).`
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="muted">Admin preview</Badge>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Content management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A sneak peek of the admin experience — manage courses, students and orders.
            </p>
          </div>
          <Button className="gap-2" onClick={openNew}>
            <Plus className="h-4 w-4" /> New course
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Courses" value={initial.length} icon={BookOpen} />
          <Stat label="Students" value={mockStudents.length} icon={Users} />
          <Stat label="Orders" value={mockOrders.length} icon={Receipt} />
          <Stat label="Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} />
        </div>

        <Tabs defaultValue="courses" className="mt-10">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Search courses…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Course</th>
                        <th className="px-4 py-3 text-left font-semibold">Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Level</th>
                        <th className="px-4 py-3 text-left font-semibold">Price</th>
                        <th className="px-4 py-3 text-left font-semibold">Reviews</th>
                        <th className="px-4 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((c) => (
                        <tr key={c.id} className="border-t border-border">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image src={c.thumbnail} alt={c.title} fill sizes="64px" className="object-cover" />
                              </div>
                              <div className="line-clamp-1 font-medium">{c.title}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3"><Badge variant="muted">{c.category}</Badge></td>
                          <td className="px-4 py-3">{c.level}</td>
                          <td className="px-4 py-3">{formatCurrency(c.price)}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.reviews.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => openEdit(c)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete"
                                onClick={() => remove(c)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Order</th>
                      <th className="px-4 py-3 text-left font-semibold">Student</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Total</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((o) => (
                      <tr key={o.id} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{o.id}</td>
                        <td className="px-4 py-3">{o.student}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                        <td className="px-4 py-3">{formatCurrency(o.total)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={o.status === "Paid" ? "success" : "muted"}>{o.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Enrolled</th>
                      <th className="px-4 py-3 text-left font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((s) => (
                      <tr key={s.email} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                        <td className="px-4 py-3">{s.enrolled}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit course" : "New course"}
        description="Changes are visual only in demo mode."
      >
        <form onSubmit={save} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="a-title">Title</Label>
            <Input id="a-title" defaultValue={editing?.title ?? "Prompt Engineering 101"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="a-cat">Category</Label>
              <Input id="a-cat" defaultValue={editing?.category ?? "Development"} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-price">Price (USD)</Label>
              <Input id="a-price" type="number" defaultValue={editing?.price ?? 99} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="a-desc">Description</Label>
            <Textarea
              id="a-desc"
              rows={4}
              defaultValue={
                editing?.description ??
                "A hands-on course covering the fundamentals and advanced patterns in a practical, project-based way."
              }
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {editing ? "Save changes" : "Create course"}
          </Button>
        </form>
      </Dialog>
    </section>
  );
}

function Stat({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="card-hover">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="text-xl font-semibold leading-tight">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
