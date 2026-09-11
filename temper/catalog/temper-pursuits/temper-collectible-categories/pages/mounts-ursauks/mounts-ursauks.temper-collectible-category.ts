import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsUrsauks = {
  id: "01a06165-916a-7005-989b-fe3858c9f637",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "mounts-ursauks",
  title: "Ursauks",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
