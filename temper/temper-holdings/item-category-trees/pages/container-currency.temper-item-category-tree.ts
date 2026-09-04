import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const containerCurrency = {
  id: "01a05fcf-f7d3-71e3-935f-f5b27c435fd6",
  pageTypeSlug: "temper-item-category-tree",
  slug: "container-currency",
  title: "Currency",
  parent: "containers",
  displayOrder: 1,
  specializedItemTypes: [875],
} as const satisfies TemperItemCategoryTree
