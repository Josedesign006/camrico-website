"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { SegmentedControl } from "@/components/ui/Controls";
import { exportPresets } from "@/data/export";
import { cn } from "@/lib/utils";

type ExportState = "idle" | "exporting" | "ready";

export function ExportPanel() {
  const [presetId, setPresetId] = useState("youtube");
  const [format, setFormat] = useState<"video" | "gif" | "audio">("video");
  const [state, setState] = useState<ExportState>("idle");
  const [progress, setProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const preset = exportPresets.find((p) => p.id === presetId)!;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const runExport = () => {
    if (state === "exporting") return;
    timers.current.forEach(clearTimeout);
    setState("exporting");
    setProgress(0);
    const steps = [15, 38, 60, 82, 100];
    steps.forEach((p, i) => {
      timers.current.push(setTimeout(() => setProgress(p), 260 * (i + 1)));
    });
    timers.current.push(setTimeout(() => setState("ready"), 260 * steps.length + 300));
    timers.current.push(setTimeout(() => setState("idle"), 260 * steps.length + 2200));
  };

  const meta =
    format === "audio"
      ? { codec: "AAC", resolution: "—", frameRate: "—", size: "3 MB" }
      : { codec: preset.codec, resolution: preset.resolution, frameRate: preset.frameRate, size: preset.size };

  return (
    <Section id="export" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Export"
            title="Export once. Publish anywhere."
            copy="Pick a destination and the codec, resolution, and frame rate follow. No render farm required."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Presets */}
          <Reveal index={1}>
            <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {exportPresets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPresetId(p.id);
                    setFormat(p.kind === "gif" ? "gif" : "video");
                  }}
                  aria-pressed={p.id === presetId}
                  className={cn(
                    "flex flex-col items-start rounded-lg border p-4 text-left transition-all duration-200",
                    p.id === presetId
                      ? "border-accent-blue/50 bg-accent-blue/[0.06] shadow-lift"
                      : "border-subtle bg-surface-1 hover:border-strong hover:bg-surface-2"
                  )}
                >
                  <span className="text-sm font-semibold text-text-primary">
                    {p.label}
                  </span>
                  <span className="mt-1 font-mono text-[11px] text-text-muted">
                    {p.summary}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Interactive panel */}
          <Reveal index={2}>
            <WindowChrome title="Export" bodyClassName="p-5">
              <SegmentedControl
                label="Format"
                value={format}
                onChange={(f) => setFormat(f)}
                size="sm"
                options={[
                  { value: "video", label: "Video" },
                  { value: "gif", label: "GIF" },
                  { value: "audio", label: "Audio Only" },
                ]}
              />

              <dl className="mt-5 divide-y divide-white/5 border-y border-subtle">
                {[
                  ["Codec", meta.codec],
                  ["Resolution", meta.resolution],
                  ["Frame rate", meta.frameRate],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-text-secondary">{k}</dt>
                    <dd className="font-mono text-sm text-text-primary transition-colors">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={v}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          {v}
                        </motion.span>
                      </AnimatePresence>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                <HardDrive className="h-4 w-4" />
                Estimated size:
                <span className="font-mono text-text-secondary">{meta.size}</span>
              </div>

              <button className="mt-4 w-full rounded-md border border-subtle bg-surface-2 py-2 text-xs text-text-secondary transition-colors hover:bg-surface-3">
                Extract Raw Recording Files…
              </button>

              {/* Animated export CTA */}
              <button
                onClick={runExport}
                disabled={state === "exporting"}
                className={cn(
                  "relative mt-3 flex w-full items-center justify-center overflow-hidden rounded-md py-2.5 text-sm font-semibold transition-colors",
                  state === "ready"
                    ? "bg-accent-success text-white"
                    : "bg-text-primary text-background"
                )}
              >
                {state === "exporting" ? (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-accent-blue/30"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.25 }}
                  />
                ) : null}
                <span className="relative flex items-center gap-2">
                  {state === "idle" && "Export"}
                  {state === "exporting" && `Exporting… ${progress}%`}
                  {state === "ready" && (
                    <>
                      <Check className="h-4 w-4" /> Ready
                    </>
                  )}
                </span>
              </button>
            </WindowChrome>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
