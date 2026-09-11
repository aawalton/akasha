import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const alessianOrder = {
  id: "019e66ec-760c-7981-984b-06b35e689d05",
  type: "temper-set",
  slug: "alessian-order",
  title: "Alessian Order",
  key: "alessian-order",
  esoSetId: 39,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
