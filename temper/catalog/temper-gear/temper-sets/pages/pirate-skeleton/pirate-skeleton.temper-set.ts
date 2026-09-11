import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const pirateSkeleton = {
  id: "019e6484-600f-7fd6-b7b5-358ee71a5570",
  type: "temper-set",
  slug: "pirate-skeleton",
  title: "Pirate Skeleton",
  key: "pirate-skeleton",
  esoSetId: 277,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
