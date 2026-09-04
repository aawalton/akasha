import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const recipePattern = {
  id: "01a05fcf-f837-7c1b-9836-540d762d3d09",
  pageTypeSlug: "temper-item-category-tree",
  slug: "recipe-pattern",
  title: "Patterns (Clothing)",
  parent: "furnishing-recipes",
  displayOrder: 1,
  specializedItemTypes: [173],
} as const satisfies TemperItemCategoryTree
