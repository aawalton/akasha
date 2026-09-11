import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const bloodMoon = {
  id: "019e66e6-a062-7763-b13b-0d8f86ed4d42",
  type: "temper-set",
  slug: "blood-moon",
  title: "Blood Moon",
  key: "blood-moon",
  esoSetId: 400,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
