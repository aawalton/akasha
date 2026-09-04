import type { TemperSet } from "../../temper-set.page-type.ts"

export const combatPhysician = {
  id: "019e66e6-a069-7947-b9ad-a19834973b1c",
  pageTypeSlug: "temper-set",
  slug: "combat-physician",
  title: "Combat Physician",
  key: "combat-physician",
  esoSetId: 194,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
