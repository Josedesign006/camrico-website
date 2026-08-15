"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A moment of pure typography — no UI, lots of air — to reset the pacing
 * between two dense product sections. Words rise in on view.
 */
export function Interstitial({
  lead,
  rest,
  kicker,
}: {
  lead: string;
  rest: string;
  kicker?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const words = rest.split(" ");

  return (
    <section className="py-24 sm:py-36">
      <div className="shell">
        {kicker ? (
          <p className="eyebrow mb-8">{kicker}</p>
        ) : null}
        <p className="type-display max-w-5xl text-pretty text-3xl leading-[1.24] text-text-muted sm:text-5xl sm:leading-[1.2]">
          <span className="text-text-primary">{lead} </span>
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: "0.4em" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : i * 0.028,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
