import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-set/temper-set.page-type.types.ts"

export const barSakka = {
  id: "019e66e7-69fb-7061-8c1d-cfc0e6d93b3a",
  type: "page-type/temper-set",
  slug: "bar-sakka",
  title: "Bar-Sakka",
  key: "bar-sakka",
  esoSetId: 829,
  subcategoryId: "no-type",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
