import type { TemperDebuffOther } from "akasha/temper/catalog/temper-effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export const concussed = {
  id: "01a05fc6-42c7-73da-830f-9717c9e35d8f",
  type: "page-type/temper-debuff-other",
  slug: "concussed",
  title: "Concussed",
  key: "concussed",
  description: "Applies Minor Vulnerability, increasing damage taken by 5%",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
