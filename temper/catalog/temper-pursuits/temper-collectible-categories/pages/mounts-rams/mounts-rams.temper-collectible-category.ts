import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsRams = {
  id: "01a06165-916a-7000-8014-eb1ef20e60c2",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "mounts-rams",
  title: "Rams",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
