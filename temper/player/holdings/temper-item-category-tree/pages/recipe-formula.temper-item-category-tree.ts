import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeFormula = {
  id: "01a05fcf-f836-7114-a3a3-4d1b5a41681d",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-formula",
  title: "Formulas (Alchemy)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 3,
  specializedItemTypes: [175],
} as const satisfies TemperItemCategoryTree
