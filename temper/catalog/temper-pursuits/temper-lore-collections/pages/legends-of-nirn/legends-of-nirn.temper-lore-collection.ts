import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const legendsOfNirn = {
  id: "01a06343-f9fa-708a-b0d2-238c09c23aa0",
  type: "temper-lore-collection",
  slug: "legends-of-nirn",
  title: "Legends of Nirn",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 13,
  books: "jsonl",
} as const satisfies TemperLoreCollection
