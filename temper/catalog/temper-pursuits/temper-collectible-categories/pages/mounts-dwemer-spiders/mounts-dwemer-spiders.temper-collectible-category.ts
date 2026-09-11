import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsDwemerSpiders = {
  id: "01a06165-9169-700e-bc03-12f9abcb73d1",
  type: "temper-collectible-category",
  slug: "mounts-dwemer-spiders",
  title: "Dwemer Spiders",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
