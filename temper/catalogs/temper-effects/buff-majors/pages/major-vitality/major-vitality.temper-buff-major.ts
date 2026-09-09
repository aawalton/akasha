import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorVitality = {
  id: "01a05fc5-f6bc-7b8b-8cfa-5e80d8b7724b",
  pageTypeSlug: "temper-buff-major",
  slug: "major-vitality",
  title: "Major Vitality",
  key: "major-vitality",
  description: "Increases healing received and damage shield strength by 12%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
