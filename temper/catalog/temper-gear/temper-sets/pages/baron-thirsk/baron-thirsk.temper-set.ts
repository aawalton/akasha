import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const baronThirsk = {
  id: "019e6484-5fee-7a8b-8960-847177b4607f",
  type: "temper-set",
  slug: "baron-thirsk",
  title: "Baron Thirsk",
  key: "baron-thirsk",
  esoSetId: 636,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
