import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const puncturingRemedy = {
  id: "019e6484-5fd0-7d49-9b4a-c7e73beb3341",
  type: "temper-set",
  slug: "puncturing-remedy",
  title: "Puncturing Remedy",
  key: "puncturing-remedy",
  esoSetId: 314,
  subcategoryId: "arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
