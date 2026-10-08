import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDoorways = {
  id: "01a05fcf-f7f3-7789-97da-11afdcf3ea39",
  type: "page-type/temper-item-category-tree",
  slug: "furn-doorways",
  title: "Doorways",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 3,
  furnitureSubcategoryIds: [162],
  createdAt: "2026-09-02T01:51:00.083Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
