import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const hitisHearth = {
  id: "019e66e6-a08f-7cf1-8344-ca95a3d12170",
  type: "temper-set",
  slug: "hitis-hearth",
  title: "Hiti's Hearth",
  key: "hitis-hearth",
  esoSetId: 471,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
