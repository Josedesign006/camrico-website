"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { Slider } from "@/components/ui/Controls";
import { backgroundPresets } from "@/data/backgrounds";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const DEFAULTS = { padding: 0.14, radius: 0.5, shadow: 0.5, bg: "aurora" };

export function CanvasStyling() {
  const reduced = usePrefersReducedMotion();
  const [padding, setPadding] = useState(DEFAULTS.padding);
  const [radius, setRadius] = useState(DEFAULTS.radius);
  const [shadow, setShadow] = useState(DEFAULTS.shadow);
  const [bgId, setBgId] = useState(DEFAULTS.bg);

  const bg = backgroundPresets.find((b) => b.id === bgId)!;

  const reset = () => {
    setPadding(DEFAULTS.padding);
    setRadius(DEFAULTS.radius);
    setShadow(DEFAULTS.shadow);
    setBgId(DEFAULTS.bg);
  };

  return (
    <Section id="styling">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Presentation styling"
            title="Give every recording a stage."
            copy="Backgrounds, framing, and shadows live right next to your timeline. Try the controls — the preview updates instantly."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Preview */}
          <Reveal index={1}>
            <div className="flex h-full items-center justify-center overflow-hidden rounded-lg border border-subtle bg-surface-1 p-6">
              <div
                className="flex aspect-video w-full items-center justify-center transition-[padding] duration-300 ease-out-quint"
                style={{ background: bg.css, padding: `${padding * 100}%` }}
              >
                <div
                  className="h-full w-full overflow-hidden transition-all duration-300 ease-out-quint"
                  style={{
                    borderRadius: `${radius * 22}px`,
                    boxShadow: `0 ${shadow * 50}px ${shadow * 90}px rgba(0,0,0,${
                      0.15 + shadow * 0.5
                    })`,
                  }}
                >
                  {reduced ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/canvas-styling-poster.webp"
                      alt="Screen recording preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover"
                      src="/canvas-styling.mp4"
                      poster="/canvas-styling-poster.webp"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="Screen recording preview"
                    />
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal index={2}>
            <WindowChrome
              title="Canvas"
              bodyClassName="p-5"
              trailing={
                <button
                  onClick={reset}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-text-muted transition-colors hover:text-text-primary"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              }
            >
              <div className="space-y-5">
                <Slider
                  label="Padding"
                  value={padding}
                  min={0}
                  max={0.28}
                  onChange={setPadding}
                  display={padding.toFixed(2)}
                />
                <Slider
                  label="Corner radius"
                  value={radius}
                  onChange={setRadius}
                  display={radius.toFixed(2)}
                />
                <Slider
                  label="Shadow"
                  value={shadow}
                  onChange={setShadow}
                  display={shadow.toFixed(2)}
                />

                <div>
                  <p className="mb-2.5 text-sm text-text-secondary">Background</p>
                  <div className="grid grid-cols-6 gap-2">
                    {backgroundPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setBgId(preset.id)}
                        aria-label={preset.label}
                        aria-pressed={preset.id === bgId}
                        title={preset.label}
                        className={cn(
                          "aspect-square rounded-md border transition-transform duration-150 hover:scale-105",
                          preset.id === bgId
                            ? "border-accent-blue ring-2 ring-accent-blue/40"
                            : "border-subtle"
                        )}
                        style={{ background: preset.css }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-md border border-subtle bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] text-text-muted">
                      Hex #1E1E2E
                    </span>
                    <span className="rounded-md border border-subtle bg-surface-2 px-2.5 py-1.5 text-[11px] text-text-secondary">
                      Use image…
                    </span>
                  </div>
                </div>
              </div>
            </WindowChrome>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
