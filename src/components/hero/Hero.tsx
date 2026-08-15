"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { site } from "@/data/site";
import { DownloadButton, SecondaryButton } from "@/components/ui/Button";
import { HeroScene } from "@/components/hero/HeroScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const fade = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EXPO },
      };

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Gentle parallax-out: the scene drifts up as the hero leaves. Kept mostly
  // opaque so the scroll-driven zoom on the recording stays readable.
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.55]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pt-32 sm:pt-36"
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="type-display text-balance text-5xl leading-[1.02] text-text-primary sm:text-7xl md:text-[5.25rem]">
            {reduced ? (
              <>
                Your screen, ready
                <br className="hidden sm:block" /> for the spotlight.
              </>
            ) : (
              <>
                <span className="mask-line">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EXPO, delay: 0.12 }}
                  >
                    Your screen, ready
                  </motion.span>
                </span>
                <span className="mask-line">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EXPO, delay: 0.24 }}
                  >
                    for the spotlight.
                  </motion.span>
                </span>
              </>
            )}
          </h1>

          <motion.p
            {...fade(0.28, reduced)}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary"
          >
            Record your Mac, shape every movement, clean up the sound, and export
            a polished video — without opening a traditional editor.
          </motion.p>

          <motion.div
            {...fade(0.36, reduced)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <DownloadButton href={site.download.href} size="lg" />
            <SecondaryButton href={site.demoHref} size="lg">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch the 60-second demo
            </SecondaryButton>
          </motion.div>

          <motion.p
            {...fade(0.44, reduced)}
            className="mt-5 font-mono text-xs text-text-muted"
          >
            Built for macOS · Record in 4K · Edit locally
          </motion.p>
        </div>

        <motion.div
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 44 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.4, ease: EXPO },
              })}
          className="relative mt-16 sm:mt-20"
        >
          <motion.div style={reduced ? undefined : { y: sceneY, opacity: sceneOpacity }}>
            <HeroScene />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
