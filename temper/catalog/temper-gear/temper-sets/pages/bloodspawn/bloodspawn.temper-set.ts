import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const bloodspawn = {
  id: "019e6484-5ff0-7c4d-865a-82a106a625f2",
  type: "temper-set",
  slug: "bloodspawn",
  title: "Bloodspawn",
  key: "bloodspawn",
  esoSetId: 163,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
