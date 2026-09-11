import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const housingStapleHomes = {
  id: "01a06165-9169-7004-8afd-17c24961455b",
  type: "temper-collectible-category",
  slug: "housing-staple-homes",
  title: "Staple Homes",
  parent: "housing",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
