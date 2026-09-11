import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const deadlandsAssassin = {
  id: "019e66e7-6a55-7cb7-9264-cc3fd7442c27",
  type: "temper-set",
  slug: "deadlands-assassin",
  title: "Deadlands Assassin",
  key: "deadlands-assassin",
  esoSetId: 580,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
