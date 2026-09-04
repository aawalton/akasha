import type { TemperLoreCollection } from "../../temper-lore-collection.page-type.ts"

export const stormhavenLore = {
  id: "01a06343-f9fa-700a-9a28-10e210aff1a2",
  pageTypeSlug: "temper-lore-collection",
  slug: "stormhaven-lore",
  title: "Stormhaven Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 2,
  books: "jsonl",
} as const satisfies TemperLoreCollection
