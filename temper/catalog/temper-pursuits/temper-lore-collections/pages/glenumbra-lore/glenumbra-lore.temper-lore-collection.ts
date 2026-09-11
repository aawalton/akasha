import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const glenumbraLore = {
  id: "01a06343-f9f9-7000-9866-8c0c978d0cda",
  type: "temper-lore-collection",
  slug: "glenumbra-lore",
  title: "Glenumbra Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 1,
  books: "jsonl",
} as const satisfies TemperLoreCollection
