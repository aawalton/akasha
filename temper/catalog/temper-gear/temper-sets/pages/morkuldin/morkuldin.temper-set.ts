import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const morkuldin = {
  id: "019e668e-9a53-7b7b-94e8-5c8796bac2a5",
  type: "temper-set",
  slug: "morkuldin",
  title: "Morkuldin",
  key: "morkuldin",
  esoSetId: 219,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
