import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerStackable = {
  id: "01a05fcf-f7d3-7b21-a991-0fdb768bc858",
  type: "page-type/temper-item-category-tree",
  slug: "container-stackable",
  title: "Stackable",
  parent: "temper-item-category-tree/containers",
  displayOrder: 3,
  specializedItemTypes: [890],
  createdAt: "2026-09-02T01:51:00.051Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
