import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const patronsGeneral = {
  id: "01a06165-916a-7011-98fb-5ee37e0f812a",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "patrons-general",
  title: "General",
  parent: "patrons",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
