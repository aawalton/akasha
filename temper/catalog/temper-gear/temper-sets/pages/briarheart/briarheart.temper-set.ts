import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const briarheart = {
  id: "019e66e7-6a4c-74d1-9c80-a8e8faf6af61",
  type: "temper-set",
  slug: "briarheart",
  title: "Briarheart",
  key: "briarheart",
  esoSetId: 212,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
