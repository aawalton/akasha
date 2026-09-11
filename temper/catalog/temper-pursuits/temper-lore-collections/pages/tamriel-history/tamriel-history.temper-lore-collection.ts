import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const tamrielHistory = {
  id: "01a06343-f9fa-70cc-8f2e-1824bfa2e28c",
  pageTypeSlug: "temper-lore-collection",
  type: "temper-lore-collection",
  slug: "tamriel-history",
  title: "Tamriel History",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 19,
  books: "jsonl",
} as const satisfies TemperLoreCollection
