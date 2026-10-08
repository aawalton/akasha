import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCreepyCrawlies = {
  id: "01a05fcf-f7ef-76d9-afc6-55c1abbc665c",
  type: "page-type/temper-item-category-tree",
  slug: "furn-creepy-crawlies",
  title: "Creepy Crawlies",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 0,
  furnitureSubcategoryIds: [40],
  createdAt: "2026-09-02T01:51:00.079Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
