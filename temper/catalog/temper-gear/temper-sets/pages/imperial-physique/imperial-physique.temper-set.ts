import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const imperialPhysique = {
  id: "019e66ec-7785-70ad-bd7a-7bd02f6eba38",
  type: "temper-set",
  slug: "imperial-physique",
  title: "Imperial Physique",
  key: "imperial-physique",
  esoSetId: 253,
  subcategoryId: "pvp",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
