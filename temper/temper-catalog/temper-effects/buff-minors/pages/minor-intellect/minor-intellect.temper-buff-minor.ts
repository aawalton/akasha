import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorIntellect = {
  id: "01a05fc5-f6bf-79d4-b0f6-4271964cb3b9",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-intellect",
  title: "Minor Intellect",
  key: "minor-intellect",
  description: "Increases Magicka Recovery by 15%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
