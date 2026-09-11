import type { TemperBuffMajor } from "akasha/temper/catalog/temper-effects/temper-buff-majors/temper-buff-major.page-type.types.ts"

export const majorVitality = {
  id: "01a05fc5-f6bc-7b8b-8cfa-5e80d8b7724b",
  type: "temper-buff-major",
  slug: "major-vitality",
  title: "Major Vitality",
  key: "major-vitality",
  description: "Increases healing received and damage shield strength by 12%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
