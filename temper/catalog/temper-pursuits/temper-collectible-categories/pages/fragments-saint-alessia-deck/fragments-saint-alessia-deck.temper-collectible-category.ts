import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsSaintAlessiaDeck = {
  id: "01a06165-9168-700e-bb32-6ae917e78a9d",
  type: "temper-collectible-category",
  slug: "fragments-saint-alessia-deck",
  title: "Saint Alessia Deck",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
