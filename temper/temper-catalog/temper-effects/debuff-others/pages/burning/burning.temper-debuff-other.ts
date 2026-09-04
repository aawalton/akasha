import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const burning = {
  id: "01a05fc6-42c6-72d6-9960-22ff2b7c8456",
  pageTypeSlug: "temper-debuff-other",
  slug: "burning",
  title: "Burning",
  key: "burning",
  description: "Deals Flame Damage over time and applies Minor Breach",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
