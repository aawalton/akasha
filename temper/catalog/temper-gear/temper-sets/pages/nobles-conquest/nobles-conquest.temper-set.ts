import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const noblesConquest = {
  id: "019e668e-9a58-715d-b2f8-c8a5e930f58d",
  type: "temper-set",
  slug: "nobles-conquest",
  title: "Noble's Conquest",
  key: "nobles-conquest",
  esoSetId: 176,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
