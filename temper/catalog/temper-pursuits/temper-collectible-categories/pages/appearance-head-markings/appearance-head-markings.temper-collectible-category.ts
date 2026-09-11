import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const appearanceHeadMarkings = {
  id: "01a06165-9165-7000-ad21-8162f1fa5f64",
  type: "temper-collectible-category",
  slug: "appearance-head-markings",
  title: "Head Markings",
  parent: "appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
