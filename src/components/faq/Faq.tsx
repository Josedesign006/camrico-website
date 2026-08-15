"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqItems } from "@/data/faq";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function FaqRow({
  item,
  open,
  onToggle,
  id,
}: {
  item: (typeof faqItems)[number];
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="border-b border-subtle">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-base font-medium text-text-primary">
            {item.question}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-prose pb-5 text-sm leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="Questions, answered." />
          </Reveal>

          <Reveal index={1}>
            <div>
              {faqItems.map((item, i) => (
                <FaqRow
                  key={item.question}
                  id={`faq-${i}`}
                  item={item}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
