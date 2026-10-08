import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const rareFish = {
  id: "01a05fcf-f832-715c-82e8-cffc41f00b6c",
  type: "page-type/temper-item-category-tree",
  slug: "rare-fish",
  title: "Rare Fish",
  parent: "temper-item-category-tree/treasures",
  displayOrder: 1,
  specializedItemTypes: [80],
  createdAt: "2026-09-02T01:51:00.146Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
