import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const drinkDistillate = {
  id: "01a05fcf-f7db-79d5-8585-b616b8817c71",
  type: "temper-item-category-tree",
  slug: "drink-distillate",
  title: "Distillate",
  parent: "drink",
  displayOrder: 6,
  specializedItemTypes: [26],
} as const satisfies TemperItemCategoryTree
