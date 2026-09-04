import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsMultiRider = {
  id: "01a06165-9169-7013-bce6-70a85faa9f4a",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-multi-rider",
  title: "Multi-Rider",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
