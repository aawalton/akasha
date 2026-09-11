import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsBrekkas = {
  id: "01a06165-9169-700a-97da-4b65cef2e067",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "mounts-brekkas",
  title: "Brekkas",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
