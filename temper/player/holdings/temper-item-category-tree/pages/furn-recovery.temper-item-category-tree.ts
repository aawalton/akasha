import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnRecovery = {
  id: "01a05fcf-f80b-74c5-8483-ee723e701e55",
  type: "page-type/temper-item-category-tree",
  slug: "furn-recovery",
  title: "Recovery",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 9,
  furnitureSubcategoryIds: [197],
  createdAt: "2026-09-02T01:51:00.107Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
