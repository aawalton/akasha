import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodMeat = {
  id: "01a05fcf-f7e3-7597-8f4d-334c6b5ec76f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-meat",
  title: "Meat",
  parent: "food",
  displayOrder: 0,
  specializedItemTypes: [1],
} as const satisfies TemperItemCategoryTree
