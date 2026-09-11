import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsOrnaugs = {
  id: "01a06165-9169-7015-8ad6-4e9b54c55f74",
  type: "temper-collectible-category",
  slug: "mounts-ornaugs",
  title: "Ornaugs",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
