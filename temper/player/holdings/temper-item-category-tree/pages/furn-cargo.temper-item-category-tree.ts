import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCargo = {
  id: "01a05fcf-f7ec-7d91-96e3-bd26a2c222a0",
  type: "page-type/temper-item-category-tree",
  slug: "furn-cargo",
  title: "Cargo",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 0,
  furnitureSubcategoryIds: [94],
  createdAt: "2026-09-02T01:51:00.076Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
