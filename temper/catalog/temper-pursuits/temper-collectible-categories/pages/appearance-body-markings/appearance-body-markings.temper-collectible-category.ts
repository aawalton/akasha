import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const appearanceBodyMarkings = {
  id: "01a06165-9164-7003-aec9-cca47505ba13",
  type: "temper-collectible-category",
  slug: "appearance-body-markings",
  title: "Body Markings",
  parent: "appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
