import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const battalionDefender = {
  id: "019e66ec-763e-7eab-a642-42220d59688a",
  type: "temper-set",
  slug: "battalion-defender",
  title: "Battalion Defender",
  key: "battalion-defender",
  esoSetId: 422,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
