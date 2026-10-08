import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumBelt = {
  id: "01a05fcf-f82b-767f-99d9-0c98435a473b",
  type: "page-type/temper-item-category-tree",
  slug: "medium-belt",
  title: "Belt",
  parent: "temper-item-category-tree/medium-armor",
  displayOrder: 4,
  equipTypes: [8],
  createdAt: "2026-09-02T01:51:00.139Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
