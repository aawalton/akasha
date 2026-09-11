import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const maligaligsMaelstrom = {
  id: "019e66e6-a0a2-7649-8fd9-ea60940df192",
  type: "temper-set",
  slug: "maligaligs-maelstrom",
  title: "Maligalig's Maelstrom",
  key: "maligaligs-maelstrom",
  esoSetId: 619,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
