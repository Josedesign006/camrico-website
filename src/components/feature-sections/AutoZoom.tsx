"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Checkbox, Slider } from "@/components/ui/Controls";
import { AppScene } from "@/components/product/AppScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Full-bleed, cinematic treatment — deliberately breaks the two-column
 * rhythm. The recording runs edge to edge; the controls float on the canvas
 * as a small HUD instead of sitting in a side panel.
 */
export function AutoZoom() {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(true);
  const [level, setLevel] = useState(2);
  const [blur, setBlur] = useState(0.5);

  const active = on && !reduced;
  const zoomScale = 1 + (level - 1) * 0.3;

  return (
    <Section id="zoom" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Automatic zoom"
            title="Guide attention without keyframing."
            copy="Automatic zoom follows important actions and keeps the viewer focused on what matters — no keyframes, no bounce."
          />
        </Reveal>
      </div>

      {/* Full-bleed stage */}
      <Reveal index={1}>
        <div className="mt-12 px-4 sm:px-6">
          <div
            className="relative mx-auto aspect-[16/10] w-full max-w-[1500px] overflow-hidden rounded-xl border border-subtle shadow-window sm:aspect-[21/9]"
            style={{
              background:
                "radial-gradient(120% 120% at 30% 10%, #2f3441 0%, #23262f 55%, #16181f 100%)",
            }}
          >
            {/* The recording, centred and large */}
            <div className="absolute inset-0 flex items-center justify-center p-[5%] sm:p-[4%]">
              <motion.div
                className="relative aspect-video w-full max-w-[62%] overflow-hidden rounded-lg shadow-window"
                animate={
                  active
                    ? {
                        scale: [1, 1, zoomScale, zoomScale, 1],
                        x: [0, 0, "-14%", "-14%", 0],
                        y: [0, 0, "10%", "10%", 0],
                        filter: [
                          "blur(0px)",
                          "blur(0px)",
                          `blur(${blur * 1.5}px)`,
                          "blur(0px)",
                          "blur(0px)",
                        ],
                      }
                    : { scale: 1, x: 0, y: 0, filter: "blur(0px)" }
                }
                transition={{
                  duration: 6,
                  times: [0, 0.3, 0.44, 0.72, 1],
                  repeat: active ? Infinity : 0,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                <AppScene variant="calendar" />
              </motion.div>

              {active ? (
                <motion.div
                  className="pointer-events-none absolute z-10"
                  animate={{
                    left: ["42%", "58%", "58%", "58%", "42%"],
                    top: ["40%", "64%", "64%", "64%", "40%"],
                  }}
                  transition={{
                    duration: 6,
                    times: [0, 0.3, 0.44, 0.72, 1],
                    repeat: Infinity,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  <MousePointer2 className="h-5 w-5 fill-white text-black drop-shadow" />
                </motion.div>
              ) : null}
            </div>

            {/* Zoom marker rail along the bottom edge */}
            <div className="pointer-events-none absolute inset-x-6 bottom-4 hidden items-center gap-2 sm:flex">
              <span className="font-mono text-[10px] text-white/40">timeline</span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="absolute inset-y-0 left-[42%] w-[16%] rounded-full bg-[#6f5bff]" />
                {active ? (
                  <motion.span
                    className="absolute inset-y-0 w-0.5 bg-accent-record"
                    animate={{ left: ["3%", "97%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <span className="absolute inset-y-0 left-[50%] w-0.5 bg-accent-record" />
                )}
              </div>
            </div>

            {/* Floating on-canvas control HUD */}
            <div className="absolute left-4 top-4 w-[210px] rounded-lg border border-white/10 bg-black/45 p-3.5 backdrop-blur-md sm:left-6 sm:top-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
                <span className="text-xs font-medium text-white">Automatic zoom</span>
              </div>
              <div className="space-y-3.5">
                <Checkbox checked={on} onChange={setOn} label="Automatic zoom" />
                <div className={on ? "space-y-3.5" : "space-y-3.5 opacity-40"}>
                  <Slider
                    label="Zoom level"
                    value={level}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={setLevel}
                    display={level.toFixed(1) + "×"}
                  />
                  <Slider
                    label="Motion blur"
                    value={blur}
                    onChange={setBlur}
                    display={blur.toFixed(2)}
                  />
                </div>
              </div>
            </div>

            {!on ? (
              <span className="absolute bottom-4 right-6 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80">
                Static · zoom off
              </span>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
