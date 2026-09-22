import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodVegetable = {
  id: "01a05fcf-f7e4-7dab-8996-7512f780bbcf",
  type: "page-type/temper-item-category-tree",
  slug: "food-vegetable",
  title: "Vegetable",
  parent: "temper-item-category-tree/food",
  displayOrder: 2,
  specializedItemTypes: [3],
} as const satisfies TemperItemCategoryTree
