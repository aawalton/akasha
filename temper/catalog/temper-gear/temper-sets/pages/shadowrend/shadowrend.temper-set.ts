import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const shadowrend = {
  id: "019e6484-6016-78cf-b4ea-3026cd5c80d7",
  type: "temper-set",
  slug: "shadowrend",
  title: "Shadowrend",
  key: "shadowrend",
  esoSetId: 265,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
