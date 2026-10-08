import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerCurrency = {
  id: "01a05fcf-f7d3-71e3-935f-f5b27c435fd6",
  type: "page-type/temper-item-category-tree",
  slug: "container-currency",
  title: "Currency",
  parent: "temper-item-category-tree/containers",
  displayOrder: 1,
  specializedItemTypes: [875],
  createdAt: "2026-09-02T01:51:00.051Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
