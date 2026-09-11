import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsVvardvarks = {
  id: "01a06165-916a-7006-8c25-0410186b4e75",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "mounts-vvardvarks",
  title: "Vvardvarks",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
