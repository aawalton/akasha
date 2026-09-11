import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const elementalSuccession = {
  id: "019e6484-5fa9-7498-a3d1-0deb1cf2af01",
  type: "temper-set",
  slug: "elemental-succession",
  title: "Elemental Succession",
  key: "elemental-succession",
  esoSetId: 215,
  subcategoryId: "arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
