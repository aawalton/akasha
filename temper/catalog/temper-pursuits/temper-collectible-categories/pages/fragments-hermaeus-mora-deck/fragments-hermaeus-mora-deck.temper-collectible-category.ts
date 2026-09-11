import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsHermaeusMoraDeck = {
  id: "01a06165-9167-7015-a70a-fba490ce2705",
  type: "temper-collectible-category",
  slug: "fragments-hermaeus-mora-deck",
  title: "Hermaeus Mora Deck",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
