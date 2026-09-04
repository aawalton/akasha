import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const oneHanded = {
  id: "01a05fcf-f82f-71a1-b0cb-ea1fce60aa17",
  pageTypeSlug: "temper-item-category-tree",
  slug: "one-handed",
  title: "One-Handed",
  parent: "weapons",
  displayOrder: 0,
  equipTypes: [5],
} as const satisfies TemperItemCategoryTree
