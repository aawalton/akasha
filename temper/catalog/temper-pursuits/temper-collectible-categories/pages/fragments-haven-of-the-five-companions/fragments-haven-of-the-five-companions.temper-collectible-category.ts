import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsHavenOfTheFiveCompanions = {
  id: "01a06165-9167-7014-be98-6c874d409160",
  type: "temper-collectible-category",
  slug: "fragments-haven-of-the-five-companions",
  title: "Haven of the Five Companions",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
