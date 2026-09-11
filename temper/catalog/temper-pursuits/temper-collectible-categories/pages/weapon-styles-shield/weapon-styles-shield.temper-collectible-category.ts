import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const weaponStylesShield = {
  id: "01a06165-916b-7001-83c6-caf2174261ef",
  type: "temper-collectible-category",
  slug: "weapon-styles-shield",
  title: "Shield",
  parent: "weapon-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
