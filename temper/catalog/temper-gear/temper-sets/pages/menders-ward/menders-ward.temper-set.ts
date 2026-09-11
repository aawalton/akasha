import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const mendersWard = {
  id: "019e6484-5fb6-7685-a185-bd0a354b1b95",
  type: "temper-set",
  slug: "menders-ward",
  title: "Mender's Ward",
  key: "menders-ward",
  esoSetId: 416,
  subcategoryId: "arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
