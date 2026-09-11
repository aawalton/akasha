import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const brandsOfImperium = {
  id: "019e66e6-a065-77ce-99a0-39a5608af262",
  type: "temper-set",
  slug: "brands-of-imperium",
  title: "Brands of Imperium",
  key: "brands-of-imperium",
  esoSetId: 184,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
