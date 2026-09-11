import type { TemperDebuffOther } from "akasha/temper/catalog/temper-effects/temper-debuff-others/temper-debuff-other.page-type.types.ts"

export const poisoned = {
  id: "01a05fc6-42c9-7738-b664-0a5ebbb61a72",
  pageTypeSlug: "temper-debuff-other",
  type: "temper-debuff-other",
  slug: "poisoned",
  title: "Poisoned",
  key: "poisoned",
  description: "Deals Poison Damage over time and applies Minor Cowardice",
  effects: "jsonl",
} as const satisfies TemperDebuffOther
