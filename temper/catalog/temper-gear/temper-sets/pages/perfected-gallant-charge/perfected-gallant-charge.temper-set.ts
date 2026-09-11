import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const perfectedGallantCharge = {
  id: "019e6484-5fbe-7d9b-9c75-e249417f0362",
  type: "temper-set",
  slug: "perfected-gallant-charge",
  title: "Perfected Gallant Charge",
  key: "perfected-gallant-charge",
  esoSetId: 423,
  subcategoryId: "arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
