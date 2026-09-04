import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mediumJack = {
  id: "01a05fcf-f82d-7e2d-9945-c5afcaebefdb",
  pageTypeSlug: "temper-item-category-tree",
  slug: "medium-jack",
  title: "Jack",
  parent: "medium-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
