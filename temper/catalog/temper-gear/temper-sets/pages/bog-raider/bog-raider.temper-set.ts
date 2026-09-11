import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const bogRaider = {
  id: "019e66e7-6a4b-7095-8a60-cbaecfb51d3a",
  type: "temper-set",
  slug: "bog-raider",
  title: "Bog Raider",
  key: "bog-raider",
  esoSetId: 581,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
