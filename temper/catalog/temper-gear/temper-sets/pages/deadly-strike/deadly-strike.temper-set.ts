import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const deadlyStrike = {
  id: "019e66ec-76dc-7cc4-a073-7263a20a874f",
  type: "temper-set",
  slug: "deadly-strike",
  title: "Deadly Strike",
  key: "deadly-strike",
  esoSetId: 127,
  subcategoryId: "pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
