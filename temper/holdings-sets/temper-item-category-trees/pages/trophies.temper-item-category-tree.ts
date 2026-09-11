import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const trophies = {
  id: "01a05fcf-f846-77dc-9c7f-f67085d7d9e1",
  type: "temper-item-category-tree",
  slug: "trophies",
  title: "Trophies",
  parent: "miscellaneous",
  displayOrder: 5,
  itemTypes: [5],
} as const satisfies TemperItemCategoryTree
