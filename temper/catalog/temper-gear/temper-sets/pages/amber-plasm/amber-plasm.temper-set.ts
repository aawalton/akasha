import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const amberPlasm = {
  id: "019e66e6-a056-71ef-bf01-a3f69806e63c",
  type: "temper-set",
  slug: "amber-plasm",
  title: "Amber Plasm",
  key: "amber-plasm",
  esoSetId: 258,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
