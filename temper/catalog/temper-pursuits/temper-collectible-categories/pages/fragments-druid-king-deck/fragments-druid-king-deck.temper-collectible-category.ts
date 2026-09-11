import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsDruidKingDeck = {
  id: "01a06165-9167-7013-9b81-4cdb285da6db",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "fragments-druid-king-deck",
  title: "Druid King Deck",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
