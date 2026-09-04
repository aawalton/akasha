import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodUnique = {
  id: "01a05fcf-f7e4-70d9-8dc6-b6c9ea581097",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-unique",
  title: "Unique",
  parent: "food",
  displayOrder: 7,
  specializedItemTypes: [8],
} as const satisfies TemperItemCategoryTree
