import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorForce = {
  id: "01a05fc5-f6be-70f8-aec6-a8330fe4c092",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-force",
  title: "Minor Force",
  key: "minor-force",
  description: "Increases Critical Damage by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
