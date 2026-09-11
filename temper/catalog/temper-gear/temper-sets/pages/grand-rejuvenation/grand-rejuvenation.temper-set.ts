import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const grandRejuvenation = {
  id: "019e6484-5fb2-7b67-b3dc-9175b48a5c4f",
  type: "temper-set",
  slug: "grand-rejuvenation",
  title: "Grand Rejuvenation",
  key: "grand-rejuvenation",
  esoSetId: 318,
  subcategoryId: "arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
