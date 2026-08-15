import {
  Workflow,
  MousePointer2,
  Layers,
  SlidersHorizontal,
  MonitorSmartphone,
  Share2,
} from "lucide-react";
import type { UseCase, Principle } from "@/types";

export const useCases: UseCase[] = [
  {
    id: "product-demos",
    audience: "Product & design",
    title: "Product demos",
    copy: "Turn a feature walkthrough into a launch-ready product video.",
  },
  {
    id: "tutorials",
    audience: "Educators & YouTubers",
    title: "Tutorials",
    copy: "Keep viewers focused through every click and explanation.",
  },
  {
    id: "documentation",
    audience: "Docs teams",
    title: "Documentation",
    copy: "Create lightweight GIFs and short videos that explain more than screenshots.",
  },
  {
    id: "outreach",
    audience: "Sales & support",
    title: "Personalised outreach",
    copy: "Record polished customer and sales videos without a complicated setup.",
  },
];

export const principles: Principle[] = [
  {
    title: "Record and edit in one workflow",
    copy: "Capture, shape, and export from the same app — no round trips.",
    icon: Workflow,
  },
  {
    title: "No traditional-editor complexity",
    copy: "A focused timeline built around screen recordings, not film production.",
    icon: SlidersHorizontal,
  },
  {
    title: "Built around cursor and zoom",
    copy: "The things that make a demo clear are first-class, not afterthoughts.",
    icon: MousePointer2,
  },
  {
    title: "Styling is part of the editor",
    copy: "Backgrounds, framing, and shadows live next to your timeline.",
    icon: Layers,
  },
  {
    title: "Flexible export",
    copy: "One project, many destinations — YouTube, web, docs, or an editing suite.",
    icon: Share2,
  },
  {
    title: "A native macOS experience",
    copy: "It feels like a Mac app because it is one.",
    icon: MonitorSmartphone,
  },
];
