import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const havenOfUrsus = {
  id: "019e66e6-a08c-79e8-bc3c-68956a7fa46a",
  type: "temper-set",
  slug: "haven-of-ursus",
  title: "Haven of Ursus",
  key: "haven-of-ursus",
  esoSetId: 401,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
