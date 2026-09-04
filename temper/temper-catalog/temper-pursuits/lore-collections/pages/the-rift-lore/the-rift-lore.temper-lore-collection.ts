import type { TemperLoreCollection } from "../../temper-lore-collection.page-type.ts"

export const theRiftLore = {
  id: "01a06343-f9fa-7103-9bb8-8e970ee0e26f",
  pageTypeSlug: "temper-lore-collection",
  slug: "the-rift-lore",
  title: "The Rift Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 24,
  books: "jsonl",
} as const satisfies TemperLoreCollection
