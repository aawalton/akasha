import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBathingGoods = {
  id: "01a05fcf-f7e7-7b57-b31e-77a51cdcf429",
  type: "page-type/temper-item-category-tree",
  slug: "furn-bathing-goods",
  title: "Bathing Goods",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 0,
  furnitureSubcategoryIds: [175],
  createdAt: "2026-09-02T01:51:00.071Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
