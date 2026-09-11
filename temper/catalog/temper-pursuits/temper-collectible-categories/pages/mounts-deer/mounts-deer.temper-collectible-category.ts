import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsDeer = {
  id: "01a06165-9169-700c-a2a6-6f5db14ebe82",
  type: "temper-collectible-category",
  slug: "mounts-deer",
  title: "Deer",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
