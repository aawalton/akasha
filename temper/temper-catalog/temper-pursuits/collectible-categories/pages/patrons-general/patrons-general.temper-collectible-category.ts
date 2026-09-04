import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const patronsGeneral = {
  id: "01a06165-916a-7011-98fb-5ee37e0f812a",
  pageTypeSlug: "temper-collectible-category",
  slug: "patrons-general",
  title: "General",
  parent: "patrons",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
