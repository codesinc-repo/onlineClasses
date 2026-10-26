"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  openValue: string | null;
  setOpenValue: (v: string | null) => void;
}

function AccordionItem({ value, title, children, openValue, setOpenValue }: AccordionItemProps) {
  const open = openValue === value;
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpenValue(open ? null : value)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium hover:text-primary transition-colors"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180 text-primary"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { value: string; title: React.ReactNode; content: React.ReactNode }[];
  defaultValue?: string;
  className?: string;
}

export function Accordion({ items, defaultValue, className }: AccordionProps) {
  const [openValue, setOpenValue] = React.useState<string | null>(defaultValue ?? null);
  return (
    <div className={cn("rounded-2xl border border-border bg-card px-5", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          title={item.title}
          openValue={openValue}
          setOpenValue={setOpenValue}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
