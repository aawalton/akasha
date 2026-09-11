import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const upgradeCharacter = {
  id: "01a06165-916a-7018-8e8b-52066284e9e6",
  type: "temper-collectible-category",
  slug: "upgrade-character",
  title: "Character",
  parent: "upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
