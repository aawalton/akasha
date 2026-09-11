import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const fragmentsRosebloodBat = {
  id: "01a06165-9168-700b-bfd1-8648f339883b",
  type: "temper-collectible-category",
  slug: "fragments-roseblood-bat",
  title: "Roseblood Bat",
  parent: "fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
