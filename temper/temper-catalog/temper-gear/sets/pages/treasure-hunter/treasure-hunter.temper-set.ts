import type { TemperSet } from "../../temper-set.page-type.ts"

export const treasureHunter = {
  id: "019e66e6-a0da-7f61-9182-8ebc85778d20",
  pageTypeSlug: "temper-set",
  slug: "treasure-hunter",
  title: "Treasure Hunter",
  key: "treasure-hunter",
  esoSetId: 305,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
