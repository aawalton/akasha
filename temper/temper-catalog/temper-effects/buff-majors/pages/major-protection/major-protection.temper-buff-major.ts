import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorProtection = {
  id: "01a05fc5-f6bb-775c-aa8d-fb381102b1b2",
  pageTypeSlug: "temper-buff-major",
  slug: "major-protection",
  title: "Major Protection",
  key: "major-protection",
  description: "Reduces damage taken by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
