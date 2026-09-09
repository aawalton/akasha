import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDishes = {
  id: "01a05fcf-f7f2-770c-833b-b57b3cb78163",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-dishes",
  title: "Dishes",
  parent: "furn-hearth",
  displayOrder: 4,
  furnitureSubcategoryIds: [80],
} as const satisfies TemperItemCategoryTree
