"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Hand } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Checkbox, Slider } from "@/components/ui/Controls";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type CursorStyle = "arrow" | "hand" | "ring" | "dot";

const styles: { id: CursorStyle; label: string }[] = [
  { id: "arrow", label: "Pointer" },
  { id: "hand", label: "Hand" },
  { id: "ring", label: "Ring" },
  { id: "dot", label: "Dot" },
];

function CursorGlyph({ style, size }: { style: CursorStyle; size: number }) {
  const s = 16 * size;
  if (style === "arrow")
    return <MousePointer2 style={{ width: s, height: s }} className="fill-white text-black drop-shadow" />;
  if (style === "hand")
    return <Hand style={{ width: s, height: s }} className="fill-white text-black drop-shadow" />;
  if (style === "ring")
    return (
      <span
        style={{ width: s * 1.4, height: s * 1.4 }}
        className="block rounded-full border-2 border-white shadow"
      />
    );
  return (
    <span style={{ width: s * 1.2, height: s * 1.2 }} className="block rounded-full bg-white/90 shadow" />
  );
}

export function CursorEffects() {
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<CursorStyle>("arrow");
  const [size, setSize] = useState(1.4);
  const [clicks, setClicks] = useState(true);
  const [spotlight, setSpotlight] = useState(false);

  const move = !reduced;

  return (
    <Section id="cursor">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Cursor effects"
            title="Make every movement easier to follow."
            copy="Smooth the path, size the pointer, and mark clicks — so viewers always know where to look."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/* Preview */}
          <Reveal index={1}>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-subtle shadow-window sm:aspect-[16/10]"
              style={{
                background:
                  "linear-gradient(135deg, #1f8a70 0%, #3aa88a 55%, #7fd0b6 100%)",
              }}
            >
              <div className="absolute inset-[6%] overflow-hidden rounded-lg shadow-window">
                {reduced ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/cursor-effects-poster.webp"
                    alt="Screen recording preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    src="/cursor-effects.mp4"
                    poster="/cursor-effects-poster.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Screen recording preview"
                  />
                )}
              </div>

              {spotlight && move ? (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-10"
                  animate={{
                    background: [
                      "radial-gradient(140px circle at 32% 42%, transparent 0%, rgba(0,0,0,0.6) 70%)",
                      "radial-gradient(140px circle at 64% 70%, transparent 0%, rgba(0,0,0,0.6) 70%)",
                      "radial-gradient(140px circle at 32% 42%, transparent 0%, rgba(0,0,0,0.6) 70%)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}

              {move ? (
                <motion.div
                  className="absolute z-20"
                  animate={{ left: ["32%", "64%", "64%", "32%"], top: ["42%", "70%", "70%", "42%"] }}
                  transition={{ duration: 5, times: [0, 0.4, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
                >
                  <CursorGlyph style={style} size={size} />
                  {clicks ? (
                    <motion.span
                      className="absolute left-0 top-0 -z-10 rounded-full border-2 border-white"
                      style={{ width: 44, height: 44, marginLeft: -16, marginTop: -16 }}
                      animate={{ scale: [0, 0, 1.3, 0, 0], opacity: [0, 0, 0.9, 0, 0] }}
                      transition={{ duration: 5, times: [0, 0.38, 0.46, 0.58, 1], repeat: Infinity }}
                    />
                  ) : null}
                </motion.div>
              ) : (
                <div className="absolute left-1/2 top-1/2 z-20">
                  <CursorGlyph style={style} size={size} />
                </div>
              )}
            </div>
          </Reveal>

          {/* Control card */}
          <Reveal index={2}>
            <div className="rounded-xl border border-subtle bg-surface-1 p-5">
              <p className="mb-2.5 text-sm text-text-secondary">Pointer style</p>
              <div className="grid grid-cols-4 gap-2">
                {styles.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStyle(st.id)}
                    aria-pressed={style === st.id}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-md border transition-colors",
                      style === st.id
                        ? "border-accent-blue bg-accent-blue/10"
                        : "border-subtle bg-surface-2 hover:bg-surface-3"
                    )}
                    title={st.label}
                  >
                    <span className="scale-90">
                      <CursorGlyph style={st.id} size={1} />
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <Slider
                  label="Cursor size"
                  value={size}
                  min={1}
                  max={2.4}
                  step={0.1}
                  onChange={setSize}
                  display={size.toFixed(2)}
                />
              </div>

              <div className="mt-5 space-y-3 border-t border-subtle pt-4">
                <Checkbox checked={clicks} onChange={setClicks} label="Click effects" />
                <Checkbox
                  checked={spotlight}
                  onChange={setSpotlight}
                  label="Spotlight (dim around cursor)"
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-text-muted">
                Smoothing and hide-when-idle keep the pointer calm. An emoji
                cursor is tucked away in the app, too.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
