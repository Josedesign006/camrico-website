"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal via GSAP ScrollTrigger. Rises 56px with a strong expo tail and
 * REPLAYS when scrolled back into view (`toggleActions` reverse) — so the
 * motion is actually seen, not missed on the first pass. Static under
 * reduced-motion, and content stays visible if JS never runs.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useIso(() => {
    const el = ref.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 56 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          delay: (index % 6) * 0.09,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, index]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
