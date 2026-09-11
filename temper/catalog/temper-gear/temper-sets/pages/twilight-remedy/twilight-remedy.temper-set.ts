import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const twilightRemedy = {
  id: "019e66ec-7ece-7ac4-a18c-1c6a13b1ec85",
  type: "temper-set",
  slug: "twilight-remedy",
  title: "Twilight Remedy",
  key: "twilight-remedy",
  esoSetId: 229,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
