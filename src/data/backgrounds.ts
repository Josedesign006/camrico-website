import type { BackgroundPreset } from "@/types";

export const backgroundPresets: BackgroundPreset[] = [
  {
    id: "aurora",
    label: "Aurora",
    kind: "gradient",
    css: "linear-gradient(135deg, #7b5cff 0%, #b06bff 55%, #ff77c7 100%)",
  },
  {
    id: "tide",
    label: "Tide",
    kind: "gradient",
    css: "linear-gradient(135deg, #1f6feb 0%, #3aa0ff 50%, #7fd4ff 100%)",
  },
  {
    id: "ember",
    label: "Ember",
    kind: "gradient",
    css: "linear-gradient(135deg, #c1573b 0%, #e08a5b 55%, #f0b487 100%)",
  },
  {
    id: "forest",
    label: "Forest",
    kind: "gradient",
    css: "linear-gradient(135deg, #1f8a70 0%, #3aa88a 55%, #7fd0b6 100%)",
  },
  {
    id: "slate",
    label: "Slate",
    kind: "gradient",
    css: "linear-gradient(135deg, #23262f 0%, #2f3441 60%, #3d4453 100%)",
  },
  {
    id: "blossom",
    label: "Blossom",
    kind: "gradient",
    css: "linear-gradient(135deg, #d0518e 0%, #e884b3 55%, #f4b9d5 100%)",
  },
  {
    id: "dusk",
    label: "Dusk",
    kind: "gradient",
    css: "linear-gradient(135deg, #2b2f6e 0%, #4a3f8f 55%, #6f5bb0 100%)",
  },
  {
    id: "sand",
    label: "Sand",
    kind: "gradient",
    css: "linear-gradient(135deg, #b98a5e 0%, #d7b487 55%, #ecd8ba 100%)",
  },
  {
    id: "graphite",
    label: "Graphite",
    kind: "solid",
    css: "linear-gradient(135deg, #16171a 0%, #202227 100%)",
  },
  {
    id: "ink",
    label: "Ink",
    kind: "solid",
    css: "#0d0d0f",
  },
  {
    id: "mesh",
    label: "Mesh",
    kind: "pattern",
    css: "repeating-linear-gradient(135deg, #2a2d55 0px, #2a2d55 10px, #34386a 10px, #34386a 20px)",
  },
  {
    id: "paper",
    label: "Paper",
    kind: "solid",
    css: "#f5f3ef",
  },
];
