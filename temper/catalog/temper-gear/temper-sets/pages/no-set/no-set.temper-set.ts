import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const noSet = {
  id: "019e6459-f96f-7e84-bd52-d3fb388ff0fc",
  type: "temper-set",
  slug: "no-set",
  title: "No Set",
  key: "no-set",
  esoSetId: 0,
  subcategoryId: "none",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
