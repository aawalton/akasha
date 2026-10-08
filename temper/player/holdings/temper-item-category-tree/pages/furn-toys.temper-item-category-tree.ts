import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnToys = {
  id: "01a05fcf-f815-7b8d-b654-55fe6f2dad02",
  type: "page-type/temper-item-category-tree",
  slug: "furn-toys",
  title: "Toys",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 19,
  furnitureSubcategoryIds: [195],
  createdAt: "2026-09-02T01:51:00.117Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
