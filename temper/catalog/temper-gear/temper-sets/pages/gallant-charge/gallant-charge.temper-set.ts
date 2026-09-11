import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const gallantCharge = {
  id: "019e6484-5fb0-787e-b53f-f6e970161ac3",
  type: "temper-set",
  slug: "gallant-charge",
  title: "Gallant Charge",
  key: "gallant-charge",
  esoSetId: 411,
  subcategoryId: "arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
