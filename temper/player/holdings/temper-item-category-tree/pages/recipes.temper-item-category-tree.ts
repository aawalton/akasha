import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipes = {
  id: "01a05fcf-f837-7870-bf40-e1e7c2cb3607",
  type: "page-type/temper-item-category-tree",
  slug: "recipes",
  title: "Recipes",
  parent: "temper-item-category-tree/knowledge",
  displayOrder: 0,
  itemTypes: [29],
} as const satisfies TemperItemCategoryTree
