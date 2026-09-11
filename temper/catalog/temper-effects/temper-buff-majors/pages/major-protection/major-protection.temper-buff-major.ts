import type { TemperBuffMajor } from "akasha/temper/catalog/temper-effects/temper-buff-majors/temper-buff-major.page-type.types.ts"

export const majorProtection = {
  id: "01a05fc5-f6bb-775c-aa8d-fb381102b1b2",
  type: "temper-buff-major",
  slug: "major-protection",
  title: "Major Protection",
  key: "major-protection",
  description: "Reduces damage taken by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
