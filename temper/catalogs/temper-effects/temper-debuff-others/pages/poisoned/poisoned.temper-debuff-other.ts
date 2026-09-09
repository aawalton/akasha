import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const poisoned = {
  id: "01a05fc6-42c9-7738-b664-0a5ebbb61a72",
  pageTypeSlug: "temper-debuff-other",
  slug: "poisoned",
  title: "Poisoned",
  key: "poisoned",
  description: "Deals Poison Damage over time and applies Minor Cowardice",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
