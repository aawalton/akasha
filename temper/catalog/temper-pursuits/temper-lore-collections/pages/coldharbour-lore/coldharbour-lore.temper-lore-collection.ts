import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const coldharbourLore = {
  id: "01a06343-f9fa-713a-bbf4-380237d13ef6",
  type: "temper-lore-collection",
  slug: "coldharbour-lore",
  title: "Coldharbour Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 29,
  books: "jsonl",
} as const satisfies TemperLoreCollection
