import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsAppleBobbing = {
  id: "01a06165-9167-7009-a385-accfaf1697ea",
  type: "temper-collectible-category",
  slug: "fragments-apple-bobbing",
  title: "Apple-Bobbing",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
