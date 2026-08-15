import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { principles } from "@/data/content";

/** Factual product principles in place of fabricated testimonials. */
export function Principles() {
  return (
    <Section id="principles">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Why it's built this way"
            title="Designed for the way screen videos are actually made."
            copy="No invented reviews or logos — just the ideas the app is built around."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} index={i % 3} className="bg-surface-1">
              <div className="flex h-full flex-col gap-3 p-6 transition-colors duration-300 hover:bg-surface-2">
                <p.icon className="h-5 w-5 text-text-secondary" aria-hidden="true" />
                <h3 className="text-base font-semibold text-text-primary">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
