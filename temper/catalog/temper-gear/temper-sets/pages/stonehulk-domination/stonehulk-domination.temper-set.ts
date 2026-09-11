import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const stonehulkDomination = {
  id: "019e66e7-6a21-76b7-a3a2-e3aa4f296a2c",
  type: "temper-set",
  slug: "stonehulk-domination",
  title: "Stonehulk Domination",
  key: "stonehulk-domination",
  esoSetId: 827,
  subcategoryId: "no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
