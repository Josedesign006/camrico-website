import { Monitor, AppWindow, Crop, Smartphone } from "lucide-react";
import type { CaptureMode } from "@/types";

export const captureModes: CaptureMode[] = [
  {
    id: "screen",
    label: "Screen",
    icon: Monitor,
    headline: "The whole display",
    description:
      "Capture everything on your Mac in 1080p or 4K, with your microphone and system audio.",
    audioLabel: "Record system audio",
  },
  {
    id: "window",
    label: "Window",
    icon: AppWindow,
    headline: "One application",
    description:
      "Pick a single window and record only what is inside it. Refresh the list any time.",
    audioLabel: "Record system audio",
  },
  {
    id: "area",
    label: "Area",
    icon: Crop,
    headline: "A precise region",
    description:
      "Draw a custom area with a resizable frame and exact width and height readouts.",
    audioLabel: "Record system audio",
  },
  {
    id: "iphone",
    label: "iPhone",
    icon: Smartphone,
    headline: "A connected device",
    description:
      "Record an iPhone or iPad over USB at its native resolution, ready for zooms in the editor.",
    audioLabel: "Record device audio",
  },
];
