import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const magnusGift = {
  id: "019e668e-9a51-71ad-853e-269715af2435",
  type: "temper-set",
  slug: "magnus-gift",
  title: "Magnus' Gift",
  key: "magnus-gift",
  esoSetId: 48,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
