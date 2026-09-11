import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const curseOfDoylemish = {
  id: "019e66e6-a06d-7a30-95a8-65944f4d7256",
  type: "temper-set",
  slug: "curse-of-doylemish",
  title: "Curse of Doylemish",
  key: "curse-of-doylemish",
  esoSetId: 348,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
