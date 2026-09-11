import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const foodUnique = {
  id: "01a05fcf-f7e4-70d9-8dc6-b6c9ea581097",
  type: "temper-item-category-tree",
  slug: "food-unique",
  title: "Unique",
  parent: "food",
  displayOrder: 7,
  specializedItemTypes: [8],
} as const satisfies TemperItemCategoryTree
