import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const oblivionsFoe = {
  id: "019e668e-9a59-7c3b-9de4-1501b1537d8e",
  type: "temper-set",
  slug: "oblivions-foe",
  title: "Oblivion's Foe",
  key: "oblivions-foe",
  esoSetId: 73,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
