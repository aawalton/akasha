import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeUniversal = {
  id: "01a05fcf-f83f-70f5-81ee-2b21fb9e3ab7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-universal",
  title: "Universal",
  parent: "siege-equipment",
  displayOrder: 7,
  specializedItemTypes: [403],
} as const satisfies TemperItemCategoryTree
