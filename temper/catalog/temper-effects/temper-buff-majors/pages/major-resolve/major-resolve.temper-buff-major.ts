import type { TemperBuffMajor } from "akasha/temper/catalog/temper-effects/temper-buff-majors/temper-buff-major.page-type.types.ts"

export const majorResolve = {
  id: "01a05fc5-f6bb-7409-b176-5e556a71e08e",
  pageTypeSlug: "temper-buff-major",
  type: "temper-buff-major",
  slug: "major-resolve",
  title: "Major Resolve",
  key: "major-resolve",
  description: "Increases Physical and Spell Resistance by 5948",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
