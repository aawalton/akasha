import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerCurrency = {
  id: "01a05fcf-f7d3-71e3-935f-f5b27c435fd6",
  type: "page-type/temper-item-category-tree",
  slug: "container-currency",
  title: "Currency",
  parent: "temper-item-category-tree/containers",
  displayOrder: 1,
  specializedItemTypes: [875],
} as const satisfies TemperItemCategoryTree
