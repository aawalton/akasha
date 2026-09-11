import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsMultiRider = {
  id: "01a06165-9169-7013-bce6-70a85faa9f4a",
  type: "temper-collectible-category",
  slug: "mounts-multi-rider",
  title: "Multi-Rider",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
