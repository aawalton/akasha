import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const hircinesVeneer = {
  id: "019e66e6-a08e-7bb2-abb4-0017e8855ce6",
  type: "temper-set",
  slug: "hircines-veneer",
  title: "Hircine's Veneer",
  key: "hircines-veneer",
  esoSetId: 123,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
