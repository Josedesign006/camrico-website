"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { Slider } from "@/components/ui/Controls";
import { AppScene } from "@/components/product/AppScene";
import { videoPresets } from "@/data/video-presets";
import { cn } from "@/lib/utils";

const STAGE_BG =
  "linear-gradient(135deg, #2b2f6e 0%, #4a3f8f 55%, #6f5bb0 100%)";
const FINE_DEFAULTS = { exposure: 1, contrast: 1, saturation: 1, warmth: 0 };

export function VideoEnhancement() {
  const [presetId, setPresetId] = useState("crisp");
  const [fine, setFine] = useState(FINE_DEFAULTS);

  const preset = videoPresets.find((p) => p.id === presetId)!;
  const base = preset.filter === "none" ? "" : preset.filter;
  const userFilter = `brightness(${fine.exposure}) contrast(${fine.contrast}) saturate(${fine.saturation}) sepia(${fine.warmth})`;
  const combined = `${base} ${userFilter}`.trim();

  const touched =
    fine.exposure !== 1 || fine.contrast !== 1 || fine.saturation !== 1 || fine.warmth !== 0;
  const set = (key: keyof typeof fine) => (v: number) =>
    setFine((f) => ({ ...f, [key]: v }));

  return (
    <Section id="video">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Video quality"
            title="Polish the picture, then fine-tune it."
            copy="Start with a calibrated look, then adjust exposure, contrast, and colour until it's right. Presets stay tasteful — never garish."
          />
        </Reveal>

        <Reveal index={1} className="mt-12">
          <div className="mx-auto max-w-5xl">
            <WindowChrome
              title="Effects · Video quality"
              bodyClassName="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
            >
              {/* Preview */}
              <div className="flex items-center justify-center border-b border-subtle bg-surface-1 p-5 md:border-b-0 md:border-r">
                <div
                  className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg p-[6%]"
                  style={{ background: STAGE_BG }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-window">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={presetId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute inset-0 transition-[filter] duration-300"
                        style={{ filter: combined }}
                      >
                        <AppScene variant="analytics" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur">
                    {preset.label}
                    {touched ? " · edited" : ""}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="p-5">
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Look
                </p>
                <div className="space-y-1">
                  {videoPresets.map((p) => {
                    const active = p.id === presetId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPresetId(p.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md border px-2 py-1.5 text-left transition-colors",
                          active
                            ? "border-accent-blue/40 bg-accent-blue/[0.08]"
                            : "border-transparent hover:bg-surface-2"
                        )}
                      >
                        <span className="h-8 w-14 shrink-0 overflow-hidden rounded border border-subtle">
                          <span
                            className="block h-full w-full"
                            style={{ filter: p.filter === "none" ? undefined : p.filter }}
                          >
                            <AppScene variant="analytics" />
                          </span>
                        </span>
                        <span className="flex-1">
                          <span
                            className={cn(
                              "block text-sm font-medium",
                              active ? "text-text-primary" : "text-text-secondary"
                            )}
                          >
                            {p.label}
                          </span>
                        </span>
                        {active ? (
                          <Check className="h-4 w-4 shrink-0 text-accent-blue" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="my-4 h-px bg-border-subtle" />

                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                    Fine controls
                  </p>
                  <button
                    onClick={() => setFine(FINE_DEFAULTS)}
                    disabled={!touched}
                    className={cn(
                      "flex items-center gap-1 rounded px-1.5 py-1 text-[11px] transition-colors",
                      touched
                        ? "text-text-secondary hover:text-text-primary"
                        : "text-text-muted/40"
                    )}
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>
                <div className="space-y-4">
                  <Slider label="Exposure" value={fine.exposure} min={0.8} max={1.2} step={0.01} onChange={set("exposure")} display={((fine.exposure - 1) * 100).toFixed(0) + "%"} />
                  <Slider label="Contrast" value={fine.contrast} min={0.8} max={1.3} step={0.01} onChange={set("contrast")} display={fine.contrast.toFixed(2)} />
                  <Slider label="Saturation" value={fine.saturation} min={0} max={1.6} step={0.01} onChange={set("saturation")} display={fine.saturation.toFixed(2)} />
                  <Slider label="Warmth" value={fine.warmth} min={0} max={0.4} step={0.01} onChange={set("warmth")} display={fine.warmth.toFixed(2)} />
                </div>
              </div>
            </WindowChrome>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
