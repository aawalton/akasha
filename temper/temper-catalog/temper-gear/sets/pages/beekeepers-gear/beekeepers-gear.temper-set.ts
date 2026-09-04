import type { TemperSet } from "../../temper-set.page-type.ts"

export const beekeepersGear = {
  id: "019e66e7-6a47-737d-aed5-99f54cc1fc12",
  pageTypeSlug: "temper-set",
  slug: "beekeepers-gear",
  title: "Beekeeper's Gear",
  key: "beekeepers-gear",
  esoSetId: 288,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
