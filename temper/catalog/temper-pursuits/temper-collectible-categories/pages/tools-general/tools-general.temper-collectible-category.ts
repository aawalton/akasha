import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const toolsGeneral = {
  id: "01a06165-916a-7016-99c2-e67b1f072fd6",
  type: "temper-collectible-category",
  slug: "tools-general",
  title: "General",
  parent: "tools",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
