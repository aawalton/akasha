import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodFruit = {
  id: "01a05fcf-f7e1-7627-8db3-7f0a11c93e1a",
  type: "page-type/temper-item-category-tree",
  slug: "food-fruit",
  title: "Fruit",
  parent: "temper-item-category-tree/food",
  displayOrder: 1,
  specializedItemTypes: [2],
} as const satisfies TemperItemCategoryTree
