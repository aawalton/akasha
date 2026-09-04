import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const necklace = {
  id: "01a05fcf-f82f-7d5a-962c-39b9d696f1dd",
  pageTypeSlug: "temper-item-category-tree",
  slug: "necklace",
  title: "Necklace",
  parent: "jewelry",
  displayOrder: 0,
  equipTypes: [2],
} as const satisfies TemperItemCategoryTree
