import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionBoots = {
  id: "01a05fcf-f7c4-7e13-80e8-8839e6770191",
  type: "temper-item-category-tree",
  slug: "companion-boots",
  title: "Boots",
  parent: "companion-medium",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
