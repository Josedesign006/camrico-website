"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Keyboard } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { SegmentedControl } from "@/components/ui/Controls";
import { AppScene } from "@/components/product/AppScene";
import { Waveform } from "@/components/hero/Waveform";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const lines = [
  { text: "Let's open the command palette.", keys: ["⌘", "K"] },
  { text: "Search for the export preset…", keys: null },
  { text: "…and publish straight to the web.", keys: ["⌘", "⏎"] },
];

type StyleId = "minimal" | "bold";

export function CaptionsKeystrokes() {
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<StyleId>("minimal");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % lines.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const line = lines[i];

  return (
    <Section id="captions">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Captions & keystrokes"
            title="Make every explanation easier to follow."
            copy="New recordings are transcribed in the background. Generate captions, edit the text, and show the shortcuts you press."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal index={1}>
            <div className="overflow-hidden rounded-lg border border-subtle bg-surface-1 p-6">
              <div
                className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg p-[7%]"
                style={{
                  background:
                    "linear-gradient(135deg, #b98a5e 0%, #d7b487 55%, #ecd8ba 100%)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-md shadow-window">
                  <AppScene variant="editor" />

                  {/* Keystroke chip */}
                  <AnimatePresence>
                    {line.keys ? (
                      <motion.div
                        key={`k-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-3 top-3 flex items-center gap-1"
                      >
                        {line.keys.map((k) => (
                          <kbd
                            key={k}
                            className="rounded-md border border-white/15 bg-black/75 px-2 py-1 font-mono text-xs font-semibold text-white shadow-lift"
                          >
                            {k}
                          </kbd>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`c-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "text-center",
                          style === "minimal"
                            ? "rounded-md bg-black/70 px-3 py-1.5 text-[13px] font-medium text-white"
                            : "rounded-lg bg-white px-4 py-2 text-[15px] font-bold text-black shadow-window"
                        )}
                      >
                        {line.text}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-4 h-8">
                <Waveform bars={60} seed={22} className="h-full" />
              </div>
            </div>
          </Reveal>

          <Reveal index={2}>
            <WindowChrome title="Effects · Captions" bodyClassName="p-5">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Languages className="h-4 w-4" /> Language
                  </span>
                  <span className="rounded-md bg-surface-3 px-3 py-1.5 text-xs text-text-secondary">
                    Auto-detect
                  </span>
                </div>

                <button className="w-full rounded-md border border-subtle bg-surface-2 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-3">
                  Generate Captions
                </button>

                <div>
                  <p className="mb-2.5 text-sm text-text-secondary">Caption style</p>
                  <SegmentedControl
                    label="Caption style"
                    value={style}
                    onChange={setStyle}
                    size="sm"
                    options={[
                      { value: "minimal", label: "Minimal" },
                      { value: "bold", label: "Bold" },
                    ]}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-subtle pt-4">
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Keyboard className="h-4 w-4" /> Show keystrokes
                  </span>
                  <span className="rounded-md bg-accent-blue/15 px-2.5 py-1 text-xs font-medium text-accent-blue">
                    On
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-text-muted">
                  Sensitive shortcuts can be hidden so passwords and private keys
                  never appear on screen.
                </p>
              </div>
            </WindowChrome>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
