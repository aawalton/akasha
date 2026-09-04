import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodVegetable = {
  id: "01a05fcf-f7e4-7dab-8996-7512f780bbcf",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-vegetable",
  title: "Vegetable",
  parent: "food",
  displayOrder: 2,
  specializedItemTypes: [3],
} as const satisfies TemperItemCategoryTree
