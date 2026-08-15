import type { VideoPreset } from "@/types";

/** Deliberately calibrated — differences are visible but never garish. */
export const videoPresets: VideoPreset[] = [
  {
    id: "none",
    label: "None",
    description: "The recording exactly as captured.",
    filter: "none",
  },
  {
    id: "crisp",
    label: "Crisp",
    description: "A touch more contrast and clarity for UI work.",
    filter: "contrast(1.06) saturate(1.03) brightness(1.02)",
  },
  {
    id: "vivid",
    label: "Vivid",
    description: "Richer colour for product and marketing shots.",
    filter: "contrast(1.08) saturate(1.22) brightness(1.03)",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    description: "Warmer, softer, slightly lifted shadows.",
    filter: "contrast(1.04) saturate(0.98) sepia(0.12) brightness(1.01)",
  },
  {
    id: "mono",
    label: "Mono",
    description: "Neutral black and white for focus.",
    filter: "grayscale(1) contrast(1.06) brightness(1.02)",
  },
];

export const videoFineControls = [
  "Sharpness",
  "Denoise",
  "Exposure",
  "Contrast",
  "Saturation",
  "Vibrance",
  "Warmth",
];
