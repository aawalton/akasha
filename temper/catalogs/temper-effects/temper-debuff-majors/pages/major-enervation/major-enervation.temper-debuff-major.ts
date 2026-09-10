import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.types.ts"

export const majorEnervation = {
  id: "01a05fc6-42c2-7cdc-8de6-8f74de69c848",
  pageTypeSlug: "temper-debuff-major",
  type: "temper-debuff-major",
  slug: "major-enervation",
  title: "Major Enervation",
  key: "major-enervation",
  description: "Reduces Critical Damage done by 20%",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
