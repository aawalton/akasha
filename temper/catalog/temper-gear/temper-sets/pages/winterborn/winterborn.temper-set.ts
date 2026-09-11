import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const winterborn = {
  id: "019e6484-5fda-7d66-a1e3-ce214607a3b2",
  type: "temper-set",
  slug: "winterborn",
  title: "Winterborn",
  key: "winterborn",
  esoSetId: 217,
  subcategoryId: "arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
