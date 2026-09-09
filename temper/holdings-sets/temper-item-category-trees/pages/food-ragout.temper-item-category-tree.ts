import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodRagout = {
  id: "01a05fcf-f7e3-7a9f-a8bf-3abda843f704",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-ragout",
  title: "Ragout",
  parent: "food",
  displayOrder: 4,
  specializedItemTypes: [5],
} as const satisfies TemperItemCategoryTree
