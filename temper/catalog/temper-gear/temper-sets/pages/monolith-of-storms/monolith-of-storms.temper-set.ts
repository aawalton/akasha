import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const monolithOfStorms = {
  id: "019e6484-5fe3-7102-acad-95bab72dbb1c",
  type: "temper-set",
  slug: "monolith-of-storms",
  title: "Monolith of Storms",
  key: "monolith-of-storms",
  esoSetId: 727,
  subcategoryId: "class",
  valid: ["*"],
  classId: "sorcerer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
