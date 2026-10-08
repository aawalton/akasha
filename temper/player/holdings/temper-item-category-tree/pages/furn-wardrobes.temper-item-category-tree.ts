import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWardrobes = {
  id: "01a05fcf-f81a-7011-9c04-b59368b2f6f7",
  type: "page-type/temper-item-category-tree",
  slug: "furn-wardrobes",
  title: "Wardrobes",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 8,
  furnitureSubcategoryIds: [47],
  createdAt: "2026-09-02T01:51:00.122Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
