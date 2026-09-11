import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const vengeanceLeech = {
  id: "019e66ec-79b4-712e-93a9-8975720bd6d2",
  type: "temper-set",
  slug: "vengeance-leech",
  title: "Vengeance Leech",
  key: "vengeance-leech",
  esoSetId: 129,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
