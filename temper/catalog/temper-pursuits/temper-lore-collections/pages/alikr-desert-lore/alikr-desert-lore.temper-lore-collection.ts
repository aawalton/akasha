import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const alikrDesertLore = {
  id: "01a06343-f9fa-702b-8f74-57d18cde0d2a",
  type: "temper-lore-collection",
  slug: "alikr-desert-lore",
  title: "Alik'r Desert Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 5,
  books: "jsonl",
} as const satisfies TemperLoreCollection
