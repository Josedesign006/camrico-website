"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Sparkles, Upload } from "lucide-react";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Layer that shifts slightly with pointer for parallax depth. */
function ParallaxLayer({
  children,
  depth,
  px,
  py,
  className,
  scale,
}: {
  children: React.ReactNode;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  className?: string;
  scale?: MotionValue<number>;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.div style={{ x, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 120, damping: 20 });
  const py = useSpring(rawY, { stiffness: 120, damping: 20 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  // Scroll-driven zoom: the recording grows to a peak as it nears the centre of
  // the viewport, then shrinks as you keep scrolling down past it. Sprung so it
  // feels weighted rather than locked to the scrollbar.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0.05, 0.26, 0.5], [1, 1.16, 1]);
  const previewScale = useSpring(rawScale, {
    stiffness: 150,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[860px] [perspective:1600px]"
    >
      {/* Soft studio pool of light behind the editor */}
      <div className="studio-wash pointer-events-none absolute inset-0 -z-10 blur-2xl" />

      {/* ---- Center: editor window (grows then shrinks on scroll) ---- */}
      <ParallaxLayer
        px={px}
        py={py}
        depth={6}
        scale={reduced ? undefined : previewScale}
        className="relative mx-auto w-full origin-center"
      >
        <WindowChrome
          title="Recording 2026-07-13 at 21.58.08"
          trailing={
            <motion.span
              whileHover={{ y: -1 }}
              className="flex items-center gap-1.5 rounded-md bg-accent-blue px-2.5 py-1 text-[11px] font-semibold text-white"
            >
              <Upload className="h-3 w-3" /> Export
            </motion.span>
          }
        >
          {/* Real product recording — the hero banner video */}
          <div className="relative aspect-[1280/828] w-full overflow-hidden bg-surface-2">
            {reduced ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/hero-banner-poster.webp"
                alt="Slate screen recording preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                src="/hero-banner.mp4"
                poster="/hero-banner-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Slate screen recording preview"
              />
            )}
          </div>
        </WindowChrome>
      </ParallaxLayer>

      {/* ---- Floating cursor-effect chip near the timeline ---- */}
      <ParallaxLayer
        px={px}
        py={py}
        depth={26}
        className="absolute bottom-16 left-1/2 z-30 hidden -translate-x-[130%] sm:block"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 rounded-full border border-strong bg-surface-2/90 px-3 py-1.5 shadow-panel backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
          <span className="text-[11px] font-medium text-text-secondary">
            Automatic zoom
          </span>
          <span className="h-4 w-7 rounded-full bg-accent-blue p-0.5">
            <span className="block h-3 w-3 translate-x-3 rounded-full bg-white" />
          </span>
        </motion.div>
      </ParallaxLayer>
    </div>
  );
}
