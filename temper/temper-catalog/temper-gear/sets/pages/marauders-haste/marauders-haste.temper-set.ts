import type { TemperSet } from "../../temper-set.page-type.ts"

export const maraudersHaste = {
  id: "019e66e7-6a6e-7fae-a220-4bf8ec9e5c66",
  pageTypeSlug: "temper-set",
  slug: "marauders-haste",
  title: "Marauder's Haste",
  key: "marauders-haste",
  esoSetId: 466,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
