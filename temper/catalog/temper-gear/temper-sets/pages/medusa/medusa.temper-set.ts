import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const medusa = {
  id: "019e66e6-a0a3-777b-9da1-0970ce7fbb9c",
  type: "temper-set",
  slug: "medusa",
  title: "Medusa",
  key: "medusa",
  esoSetId: 304,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
