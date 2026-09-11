import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const moonHunter = {
  id: "019e66e6-a0a5-781a-b267-8dbffaacedd9",
  type: "temper-set",
  slug: "moon-hunter",
  title: "Moon Hunter",
  key: "moon-hunter",
  esoSetId: 402,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
