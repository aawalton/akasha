import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsBigCats = {
  id: "01a06165-9169-7009-93c5-2fc31ab1717b",
  type: "temper-collectible-category",
  slug: "mounts-big-cats",
  title: "Big Cats",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
