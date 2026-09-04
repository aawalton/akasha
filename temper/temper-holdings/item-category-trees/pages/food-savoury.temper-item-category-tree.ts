import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodSavoury = {
  id: "01a05fcf-f7e4-792a-b20e-4063d71fb9a6",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-savoury",
  title: "Savoury",
  parent: "food",
  displayOrder: 3,
  specializedItemTypes: [4],
} as const satisfies TemperItemCategoryTree
