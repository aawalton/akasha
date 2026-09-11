import type { TemperLoreCollection } from "akasha/temper/catalog/temper-pursuits/temper-lore-collections/temper-lore-collection.page-type.types.ts"

export const rivenspireLore = {
  id: "01a06343-f9fa-7015-8921-d5868b2f83fb",
  type: "temper-lore-collection",
  slug: "rivenspire-lore",
  title: "Rivenspire Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 3,
  books: "jsonl",
} as const satisfies TemperLoreCollection
