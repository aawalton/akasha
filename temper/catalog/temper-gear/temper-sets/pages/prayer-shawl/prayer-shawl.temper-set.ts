import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const prayerShawl = {
  id: "019e66e6-a0b1-7c3b-8884-490d4383b136",
  type: "temper-set",
  slug: "prayer-shawl",
  title: "Prayer Shawl",
  key: "prayer-shawl",
  esoSetId: 55,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
