import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const radiantBastion = {
  id: "019e66e7-6a7d-776a-a67e-35cf3a094c05",
  type: "temper-set",
  slug: "radiant-bastion",
  title: "Radiant Bastion",
  key: "radiant-bastion",
  esoSetId: 536,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
