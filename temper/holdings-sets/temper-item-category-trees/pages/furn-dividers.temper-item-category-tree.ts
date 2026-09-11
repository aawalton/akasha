import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnDividers = {
  id: "01a05fcf-f7f2-7319-9368-40e7f2cacba2",
  type: "temper-item-category-tree",
  slug: "furn-dividers",
  title: "Dividers",
  parent: "furn-suite",
  displayOrder: 2,
  furnitureSubcategoryIds: [46],
} as const satisfies TemperItemCategoryTree
