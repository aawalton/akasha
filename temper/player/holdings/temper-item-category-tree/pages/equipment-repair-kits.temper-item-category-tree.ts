import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const equipmentRepairKits = {
  id: "01a05fcf-f7df-7b68-8a7b-19a48ecd8ac8",
  type: "page-type/temper-item-category-tree",
  slug: "equipment-repair-kits",
  title: "Equipment Repair Kits",
  parent: "temper-item-category-tree/repair-kits",
  displayOrder: 0,
  filterTypes: [3],
  itemTypes: [9],
  createdAt: "2026-09-02T01:51:00.063Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
