"use client";

import { motion } from "framer-motion";
import { seeded } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** A lightweight animated audio waveform built from divs (no canvas). */
export function Waveform({
  bars = 48,
  className,
  seed = 7,
  animate = true,
}: {
  bars?: number;
  className?: string;
  seed?: number;
  animate?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const rand = seeded(seed);
  const heights = Array.from({ length: bars }, () => 0.25 + rand() * 0.75);

  return (
    <div className={className} aria-hidden="true">
      <div className="flex h-full w-full items-center gap-[2px]">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full bg-accent-blue/60"
            style={{ height: `${h * 100}%` }}
            animate={
              animate && !reduced
                ? { scaleY: [1, 0.55 + (i % 5) * 0.12, 1] }
                : undefined
            }
            transition={{
              duration: 1.2 + (i % 4) * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}
