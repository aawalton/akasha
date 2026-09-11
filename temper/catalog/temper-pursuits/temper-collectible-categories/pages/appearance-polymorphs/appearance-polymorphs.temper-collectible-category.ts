import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const appearancePolymorphs = {
  id: "01a06165-9165-7004-b6d9-6be373aa2ec5",
  type: "temper-collectible-category",
  slug: "appearance-polymorphs",
  title: "Polymorphs",
  parent: "appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
