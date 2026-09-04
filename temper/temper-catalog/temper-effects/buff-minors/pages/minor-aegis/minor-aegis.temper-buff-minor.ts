import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorAegis = {
  id: "01a05fc5-f6bd-7da3-bf01-cc47ad1d2497",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-aegis",
  title: "Minor Aegis",
  key: "minor-aegis",
  description: "Reduces damage taken from Dungeon, Trial, and Arena monsters by 5%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
