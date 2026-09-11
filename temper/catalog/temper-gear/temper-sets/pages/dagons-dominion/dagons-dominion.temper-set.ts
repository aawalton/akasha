import type { TemperSet } from "akasha/temper/catalog/temper-gear/temper-sets/temper-set.page-type.types.ts"

export const dagonsDominion = {
  id: "019e66e6-a06e-7a90-817a-f056eb23ee90",
  type: "temper-set",
  slug: "dagons-dominion",
  title: "Dagon's Dominion",
  key: "dagons-dominion",
  esoSetId: 573,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
