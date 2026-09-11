import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const lamiasSong = {
  id: "019e66e6-a09c-7c84-86d8-8a7ccd77391a",
  type: "temper-set",
  slug: "lamias-song",
  title: "Lamia's Song",
  key: "lamias-song",
  esoSetId: 303,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
