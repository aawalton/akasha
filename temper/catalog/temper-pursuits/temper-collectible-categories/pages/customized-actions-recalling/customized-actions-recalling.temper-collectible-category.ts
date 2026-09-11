import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const customizedActionsRecalling = {
  id: "01a06165-9167-7000-97f9-202b1bb1cff8",
  type: "temper-collectible-category",
  slug: "customized-actions-recalling",
  title: "Recalling",
  parent: "customized-actions",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
