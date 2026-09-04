import type { TemperSet } from "../../temper-set.page-type.ts"

export const willpower = {
  id: "019e66ec-79fc-7049-98d7-ba8363977a09",
  pageTypeSlug: "temper-set",
  slug: "willpower",
  title: "Willpower",
  key: "willpower",
  esoSetId: 205,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
