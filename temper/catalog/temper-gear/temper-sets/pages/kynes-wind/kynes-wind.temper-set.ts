import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const kynesWind = {
  id: "019e66ec-7b7a-77ff-8a6d-c6b341b90716",
  type: "temper-set",
  slug: "kynes-wind",
  title: "Kyne's Wind",
  key: "kynes-wind",
  esoSetId: 492,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
