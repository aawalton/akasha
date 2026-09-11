import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const shatteredFate = {
  id: "019e668e-9a64-7254-9bd8-aec8a4da5280",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "shattered-fate",
  title: "Shattered Fate",
  key: "shattered-fate",
  esoSetId: 695,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
