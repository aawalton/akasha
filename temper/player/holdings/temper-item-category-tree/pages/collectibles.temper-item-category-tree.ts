import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const collectibles = {
  id: "01a05fcf-f7c2-7335-b2f8-f8dbe51f4307",
  type: "page-type/temper-item-category-tree",
  slug: "collectibles",
  title: "Collectibles",
  parent: "temper-item-category-tree/miscellaneous",
  displayOrder: 6,
  filterTypes: [12],
  createdAt: "2026-09-02T01:51:00.034Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
