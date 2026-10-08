import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTools = {
  id: "01a05fcf-f814-73be-bd62-c4dbac15450b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tools",
  title: "Tools",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 5,
  furnitureSubcategoryIds: [95],
  createdAt: "2026-09-02T01:51:00.116Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
