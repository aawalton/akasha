import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const mediumJack = {
  id: "01a05fcf-f82d-7e2d-9945-c5afcaebefdb",
  type: "temper-item-category-tree",
  slug: "medium-jack",
  title: "Jack",
  parent: "medium-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
