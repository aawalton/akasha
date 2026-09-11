import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const hundingsRage = {
  id: "019e668e-9a4a-7a60-b133-202f23bd9532",
  type: "temper-set",
  slug: "hundings-rage",
  title: "Hunding's Rage",
  key: "hundings-rage",
  esoSetId: 80,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
