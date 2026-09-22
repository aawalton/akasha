import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const drinkDistillate = {
  id: "01a05fcf-f7db-79d5-8585-b616b8817c71",
  type: "page-type/temper-item-category-tree",
  slug: "drink-distillate",
  title: "Distillate",
  parent: "temper-item-category-tree/drink",
  displayOrder: 6,
  specializedItemTypes: [26],
} as const satisfies TemperItemCategoryTree
