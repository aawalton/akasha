import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const storiesZoneDlc = {
  id: "01a06165-916a-7014-877e-133970ff8925",
  pageTypeSlug: "temper-collectible-category",
  slug: "stories-zone-dlc",
  title: "Zone DLC",
  parent: "stories",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
