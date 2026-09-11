import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const customizedActionsRuneCollecting = {
  id: "01a06165-9167-7001-9dbe-585e7614fd4f",
  type: "temper-collectible-category",
  slug: "customized-actions-rune-collecting",
  title: "Rune Collecting",
  parent: "customized-actions",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
