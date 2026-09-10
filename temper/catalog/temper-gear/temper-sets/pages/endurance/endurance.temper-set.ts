import type { TemperSet } from "../../temper-set.page-type.types.ts"

export const endurance = {
  id: "019e66ec-770e-7e38-87c5-688389338db7",
  pageTypeSlug: "temper-set",
  type: "temper-set",
  slug: "endurance",
  title: "Endurance",
  key: "endurance",
  esoSetId: 204,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
