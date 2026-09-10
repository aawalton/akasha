import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const containerStackable = {
  id: "01a05fcf-f7d3-7b21-a991-0fdb768bc858",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "container-stackable",
  title: "Stackable",
  parent: "containers",
  displayOrder: 3,
  specializedItemTypes: [890],
} as const satisfies TemperItemCategoryTree
