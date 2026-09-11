import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsBears = {
  id: "01a06165-9169-7008-80fb-4590bbc96fcb",
  type: "temper-collectible-category",
  slug: "mounts-bears",
  title: "Bears",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
