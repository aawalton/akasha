import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const timelessBlessing = {
  id: "019e66ec-7e92-74dd-8682-f75ea6d8a384",
  type: "temper-set",
  slug: "timeless-blessing",
  title: "Timeless Blessing",
  key: "timeless-blessing",
  esoSetId: 368,
  subcategoryId: "trial",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
