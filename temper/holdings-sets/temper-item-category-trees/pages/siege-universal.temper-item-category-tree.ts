import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const siegeUniversal = {
  id: "01a05fcf-f83f-70f5-81ee-2b21fb9e3ab7",
  type: "temper-item-category-tree",
  slug: "siege-universal",
  title: "Universal",
  parent: "siege-equipment",
  displayOrder: 7,
  specializedItemTypes: [403],
} as const satisfies TemperItemCategoryTree
