import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const archersMind = {
  id: "019e6484-5f9d-7b4e-bc32-c17f13b5f242",
  type: "temper-set",
  slug: "archers-mind",
  title: "Archer's Mind",
  key: "archers-mind",
  esoSetId: 23,
  subcategoryId: "arena",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
