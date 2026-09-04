import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorSlayer = {
  id: "01a05fc5-f6c1-7a93-8775-4314ab78460b",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-slayer",
  title: "Minor Slayer",
  key: "minor-slayer",
  description: "Increases damage done to Dungeon, Trial, and Arena monsters by 5%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
