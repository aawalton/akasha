import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const toothrow = {
  id: "019e66e6-a0d7-7e4b-97ef-dafc54efde95",
  type: "temper-set",
  slug: "toothrow",
  title: "Toothrow",
  key: "toothrow",
  esoSetId: 299,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
