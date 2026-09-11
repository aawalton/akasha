import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const deshaanLore = {
  id: "01a06343-f9fa-70f8-a7b9-4b9231dce65a",
  type: "temper-lore-collection",
  slug: "deshaan-lore",
  title: "Deshaan Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 23,
  books: "jsonl",
} as const satisfies TemperLoreCollection
