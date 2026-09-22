import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeDesign = {
  id: "01a05fcf-f835-7f3e-b869-7d07779c233e",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-design",
  title: "Designs (Provisioning)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 5,
  specializedItemTypes: [176],
} as const satisfies TemperItemCategoryTree
