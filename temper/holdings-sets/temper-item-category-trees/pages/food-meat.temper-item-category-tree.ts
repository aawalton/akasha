import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const foodMeat = {
  id: "01a05fcf-f7e3-7597-8f4d-334c6b5ec76f",
  type: "temper-item-category-tree",
  slug: "food-meat",
  title: "Meat",
  parent: "food",
  displayOrder: 0,
  specializedItemTypes: [1],
} as const satisfies TemperItemCategoryTree
