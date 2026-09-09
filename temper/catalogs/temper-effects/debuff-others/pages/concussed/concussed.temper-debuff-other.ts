import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const concussed = {
  id: "01a05fc6-42c7-73da-830f-9717c9e35d8f",
  pageTypeSlug: "temper-debuff-other",
  slug: "concussed",
  title: "Concussed",
  key: "concussed",
  description: "Applies Minor Vulnerability, increasing damage taken by 5%",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
