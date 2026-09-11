import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const armorStylesChest = {
  id: "01a06165-9165-7008-b7c4-08c998cce861",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "armor-styles-chest",
  title: "Chest",
  parent: "armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
