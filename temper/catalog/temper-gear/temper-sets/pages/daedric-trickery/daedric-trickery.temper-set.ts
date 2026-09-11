import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const daedricTrickery = {
  id: "019e668e-9a3c-7ba1-9d36-703bdcbe0c50",
  type: "temper-set",
  slug: "daedric-trickery",
  title: "Daedric Trickery",
  key: "daedric-trickery",
  esoSetId: 324,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
