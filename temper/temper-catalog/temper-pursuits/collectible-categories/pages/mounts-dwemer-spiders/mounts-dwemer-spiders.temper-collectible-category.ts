import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsDwemerSpiders = {
  id: "01a06165-9169-700e-bc03-12f9abcb73d1",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-dwemer-spiders",
  title: "Dwemer Spiders",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
