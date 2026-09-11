import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const divinesAndDeities = {
  id: "01a06343-f9fa-705c-a6d7-05d69b0b6282",
  type: "temper-lore-collection",
  slug: "divines-and-deities",
  title: "Divines and Deities",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 10,
  books: "jsonl",
} as const satisfies TemperLoreCollection
