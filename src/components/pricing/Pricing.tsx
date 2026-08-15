import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DownloadButton } from "@/components/ui/Button";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

export function Pricing() {
  return (
    <Section id="pricing" wash>
      <div className="shell">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Pricing"
            title="Simple to start. Yours to keep."
            copy="Try the full editor for free. Prices below are placeholders until the model is confirmed."
            className="mx-auto items-center"
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} index={i}>
              <div
                className={cn(
                  "card-hover flex h-full flex-col rounded-lg border p-7",
                  tier.highlighted
                    ? "border-accent-blue/40 bg-surface-1 shadow-panel"
                    : "border-subtle bg-surface-1/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {tier.name}
                  </h3>
                  {tier.highlighted ? (
                    <span className="rounded-full bg-accent-blue/15 px-2.5 py-1 text-[11px] font-medium text-accent-blue">
                      Most complete
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-text-primary">
                    {tier.price}
                  </span>
                  {tier.cadence ? (
                    <span className="text-sm text-text-muted">{tier.cadence}</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-text-secondary">{tier.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-text-secondary">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-success"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <DownloadButton
                  href={site.download.href}
                  size="lg"
                  className={cn(
                    "mt-7 w-full",
                    !tier.highlighted && "!bg-surface-3 !text-text-primary"
                  )}
                >
                  {tier.cta}
                </DownloadButton>
                {tier.note ? (
                  <p className="mt-3 text-center text-xs text-text-muted">{tier.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
