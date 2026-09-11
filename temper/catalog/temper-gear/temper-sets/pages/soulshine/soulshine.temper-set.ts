import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const soulshine = {
  id: "019e66e7-6a8e-73c4-ad95-063959555e28",
  type: "temper-set",
  slug: "soulshine",
  title: "Soulshine",
  key: "soulshine",
  esoSetId: 114,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
