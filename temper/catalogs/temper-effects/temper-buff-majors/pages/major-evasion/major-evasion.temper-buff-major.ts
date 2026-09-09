import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorEvasion = {
  id: "01a05fc5-f6b8-7eed-9a2d-daeecb4ff402",
  pageTypeSlug: "temper-buff-major",
  slug: "major-evasion",
  title: "Major Evasion",
  key: "major-evasion",
  description: "Reduces damage from area attacks by 20%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
