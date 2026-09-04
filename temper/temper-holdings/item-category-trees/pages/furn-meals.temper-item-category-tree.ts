import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMeals = {
  id: "01a05fcf-f801-7c99-827c-b591019104c3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-meals",
  title: "Meals",
  parent: "furn-hearth",
  displayOrder: 8,
  furnitureSubcategoryIds: [84],
} as const satisfies TemperItemCategoryTree
