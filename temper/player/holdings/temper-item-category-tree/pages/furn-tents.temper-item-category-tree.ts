import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTents = {
  id: "01a05fcf-f813-7d54-852a-4756e9f50577",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tents",
  title: "Tents",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 7,
  furnitureSubcategoryIds: [113],
  createdAt: "2026-09-02T01:51:00.115Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
