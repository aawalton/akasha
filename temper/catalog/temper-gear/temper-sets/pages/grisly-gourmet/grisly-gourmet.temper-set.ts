import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const grislyGourmet = {
  id: "019e66e6-a087-7567-98a1-8d730dbbf9d0",
  type: "temper-set",
  slug: "grisly-gourmet",
  title: "Grisly Gourmet",
  key: "grisly-gourmet",
  esoSetId: 607,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
