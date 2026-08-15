import type { PricingTier } from "@/types";

/**
 * PRICING — placeholder values. Confirm the business model before publishing.
 * Every price/label below is safe to edit in one place.
 */
export const pricingTiers: PricingTier[] = [
  {
    id: "trial",
    name: "Free trial",
    price: "Free",
    cadence: "",
    description: "Explore the full editor before you decide.",
    features: [
      "Full editor access",
      "All capture modes",
      "Watermarked exports",
      "No payment required",
    ],
    cta: "Download for Mac",
    note: "No account required.",
  },
  {
    id: "license",
    name: "One-time licence",
    price: "$TBD",
    cadence: "one-time",
    description: "Own it outright. A single purchase for the full app.",
    features: [
      "Every capture mode, up to 4K",
      "Full timeline editor",
      "Automatic zoom & cursor effects",
      "Speech enhancement & captions",
      "All export formats and presets",
      "Updates policy — to be confirmed",
    ],
    cta: "Download for Mac",
    highlighted: true,
    note: "Final price to be confirmed.",
  },
];
