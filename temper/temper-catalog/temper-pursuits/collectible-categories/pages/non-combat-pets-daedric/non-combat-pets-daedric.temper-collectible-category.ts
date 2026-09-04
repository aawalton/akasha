import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const nonCombatPetsDaedric = {
  id: "01a06165-916a-700a-832a-11e8ddacac7d",
  pageTypeSlug: "temper-collectible-category",
  slug: "non-combat-pets-daedric",
  title: "Daedric",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
