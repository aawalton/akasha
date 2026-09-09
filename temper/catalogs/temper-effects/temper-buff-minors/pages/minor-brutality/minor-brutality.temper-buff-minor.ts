import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorBrutality = {
  id: "01a05fc5-f6bd-73a2-9b1d-f09337a676a4",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-brutality",
  title: "Minor Brutality",
  key: "minor-brutality",
  description: "Increases Weapon Damage by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
