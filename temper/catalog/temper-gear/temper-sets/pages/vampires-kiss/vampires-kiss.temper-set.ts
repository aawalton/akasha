import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const vampiresKiss = {
  id: "019e668e-9a71-7c7d-86bd-d89710464a75",
  type: "temper-set",
  slug: "vampires-kiss",
  title: "Vampire's Kiss",
  key: "vampires-kiss",
  esoSetId: 44,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
