import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const mechanicalAcuity = {
  id: "019e668e-9a51-7f7f-8083-be71b7d00a70",
  type: "temper-set",
  slug: "mechanical-acuity",
  title: "Mechanical Acuity",
  key: "mechanical-acuity",
  esoSetId: 353,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
