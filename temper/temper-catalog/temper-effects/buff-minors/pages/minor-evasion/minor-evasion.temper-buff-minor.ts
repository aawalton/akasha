import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorEvasion = {
  id: "01a05fc5-f6be-742f-a474-8811a1c739b1",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-evasion",
  title: "Minor Evasion",
  key: "minor-evasion",
  description: "Reduces damage from area attacks by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
