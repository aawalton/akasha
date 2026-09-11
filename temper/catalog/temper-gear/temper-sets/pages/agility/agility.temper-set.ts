import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const agility = {
  id: "019e66ec-75ff-77ee-94a0-d4771dbf0c16",
  type: "temper-set",
  slug: "agility",
  title: "Agility",
  key: "agility",
  esoSetId: 206,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
