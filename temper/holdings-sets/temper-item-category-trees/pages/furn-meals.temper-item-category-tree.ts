import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMeals = {
  id: "01a05fcf-f801-7c99-827c-b591019104c3",
  type: "temper-item-category-tree",
  slug: "furn-meals",
  title: "Meals",
  parent: "furn-hearth",
  displayOrder: 8,
  furnitureSubcategoryIds: [84],
} as const satisfies TemperItemCategoryTree
