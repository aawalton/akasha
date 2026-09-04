import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkDistillate = {
  id: "01a05fcf-f7db-79d5-8585-b616b8817c71",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-distillate",
  title: "Distillate",
  parent: "drink",
  displayOrder: 6,
  specializedItemTypes: [26],
} as const satisfies TemperItemCategoryTree
