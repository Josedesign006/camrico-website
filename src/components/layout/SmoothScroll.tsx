"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Weighted, inertial scrolling driven by GSAP's ticker so Lenis and every
 * ScrollTrigger animation share one clock — no drift, no jitter. Disabled
 * entirely when the user prefers reduced motion (plain native scroll).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, touchMultiplier: 1.6 });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Continuous parallax on any element tagged with data-parallax.
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.parallax || "0"),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    // Recalculate trigger positions once fonts/layout settle.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
