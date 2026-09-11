import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnDishes = {
  id: "01a05fcf-f7f2-770c-833b-b57b3cb78163",
  type: "temper-item-category-tree",
  slug: "furn-dishes",
  title: "Dishes",
  parent: "furn-hearth",
  displayOrder: 4,
  furnitureSubcategoryIds: [80],
} as const satisfies TemperItemCategoryTree
