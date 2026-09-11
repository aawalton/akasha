import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const wisdomOfVanus = {
  id: "019e66e7-6ab4-71b2-b679-27808e19c95e",
  type: "temper-set",
  slug: "wisdom-of-vanus",
  title: "Wisdom of Vanus",
  key: "wisdom-of-vanus",
  esoSetId: 384,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
