import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnishings = {
  id: "01a05fcf-f81d-7d09-8f31-47cabe676ccb",
  type: "temper-item-category-tree",
  slug: "furnishings",
  title: "Furnishings",
  displayOrder: 7,
  filterTypes: [21],
  priorityOrder: 7,
} as const satisfies TemperItemCategoryTree
