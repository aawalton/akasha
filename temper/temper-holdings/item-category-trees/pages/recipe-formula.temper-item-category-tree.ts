import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const recipeFormula = {
  id: "01a05fcf-f836-7114-a3a3-4d1b5a41681d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "recipe-formula",
  title: "Formulas (Alchemy)",
  parent: "furnishing-recipes",
  displayOrder: 3,
  specializedItemTypes: [175],
} as const satisfies TemperItemCategoryTree
