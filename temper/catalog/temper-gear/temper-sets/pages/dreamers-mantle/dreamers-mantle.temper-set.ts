import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const dreamersMantle = {
  id: "019e66e7-6a5a-7731-b67f-2b3e78d51ee1",
  type: "temper-set",
  slug: "dreamers-mantle",
  title: "Dreamer's Mantle",
  key: "dreamers-mantle",
  esoSetId: 22,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
