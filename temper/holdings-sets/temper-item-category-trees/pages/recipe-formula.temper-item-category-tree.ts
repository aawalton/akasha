import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const recipeFormula = {
  id: "01a05fcf-f836-7114-a3a3-4d1b5a41681d",
  type: "temper-item-category-tree",
  slug: "recipe-formula",
  title: "Formulas (Alchemy)",
  parent: "furnishing-recipes",
  displayOrder: 3,
  specializedItemTypes: [175],
} as const satisfies TemperItemCategoryTree
