import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const storiesZoneDlc = {
  id: "01a06165-916a-7014-877e-133970ff8925",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "stories-zone-dlc",
  title: "Zone DLC",
  parent: "stories",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
