import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const daedricPrinces = {
  id: "01a06343-f9fa-7046-a185-288065db1524",
  pageTypeSlug: "temper-lore-collection",
  type: "temper-lore-collection",
  slug: "daedric-princes",
  title: "Daedric Princes",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 8,
  books: "jsonl",
} as const satisfies TemperLoreCollection
