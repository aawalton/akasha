import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPillows = {
  id: "01a05fcf-f807-7dc4-8e86-3c58af64da3f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pillows",
  title: "Pillows",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 6,
  furnitureSubcategoryIds: [50],
  createdAt: "2026-09-02T01:51:00.103Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
