import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorHeroism = {
  id: "01a05fc5-f6bf-71b4-b0dd-0dbdd3005761",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-heroism",
  title: "Minor Heroism",
  key: "minor-heroism",
  description: "Grants 1 Ultimate every 1.5 seconds",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
