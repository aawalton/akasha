import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const recipes = {
  id: "01a05fcf-f837-7870-bf40-e1e7c2cb3607",
  type: "temper-item-category-tree",
  slug: "recipes",
  title: "Recipes",
  parent: "knowledge",
  displayOrder: 0,
  itemTypes: [29],
} as const satisfies TemperItemCategoryTree
