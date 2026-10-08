import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTables = {
  id: "01a05fcf-f812-7ec2-9a19-1bfc4535b0c6",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tables",
  title: "Tables",
  parent: "temper-item-category-tree/furn-dining",
  displayOrder: 3,
  furnitureSubcategoryIds: [65],
  createdAt: "2026-09-02T01:51:00.114Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
