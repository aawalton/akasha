import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsDaedric = {
  id: "01a06165-916a-700a-832a-11e8ddacac7d",
  type: "temper-collectible-category",
  slug: "non-combat-pets-daedric",
  title: "Daedric",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
