import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const legacyOfKarth = {
  id: "019e668e-9a4f-7e74-a2df-6c165a9a997e",
  type: "temper-set",
  slug: "legacy-of-karth",
  title: "Legacy of Karth",
  key: "legacy-of-karth",
  esoSetId: 540,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
