import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const recipeDesign = {
  id: "01a05fcf-f835-7f3e-b869-7d07779c233e",
  type: "temper-item-category-tree",
  slug: "recipe-design",
  title: "Designs (Provisioning)",
  parent: "furnishing-recipes",
  displayOrder: 5,
  specializedItemTypes: [176],
} as const satisfies TemperItemCategoryTree
