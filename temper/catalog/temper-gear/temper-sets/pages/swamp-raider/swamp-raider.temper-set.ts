import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const swampRaider = {
  id: "019e66e7-6a96-788c-855b-5b5d24fb3f36",
  type: "temper-set",
  slug: "swamp-raider",
  title: "Swamp Raider",
  key: "swamp-raider",
  esoSetId: 187,
  subcategoryId: "overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
