import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnCourtyard = {
  id: "01a05fcf-f7ee-7301-a5db-9f14202553c9",
  type: "temper-item-category-tree",
  slug: "furn-courtyard",
  title: "Courtyard",
  parent: "furnishings",
  displayOrder: 4,
  furnitureCategoryIds: [5],
} as const satisfies TemperItemCategoryTree
