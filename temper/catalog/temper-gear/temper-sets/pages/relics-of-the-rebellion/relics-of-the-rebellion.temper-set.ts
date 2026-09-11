import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const relicsOfTheRebellion = {
  id: "019e6484-604e-7838-8260-35237a7a3374",
  type: "temper-set",
  slug: "relics-of-the-rebellion",
  title: "Relics of the Rebellion",
  key: "relics-of-the-rebellion",
  esoSetId: 119,
  subcategoryId: "other",
  valid: ["mace", "shield", "necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
