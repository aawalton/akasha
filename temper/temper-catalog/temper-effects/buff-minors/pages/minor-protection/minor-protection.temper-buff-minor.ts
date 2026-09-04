import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorProtection = {
  id: "01a05fc5-f6c0-7cfc-ba1e-6bceb462b6b8",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-protection",
  title: "Minor Protection",
  key: "minor-protection",
  description: "Reduces damage taken by 5%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
