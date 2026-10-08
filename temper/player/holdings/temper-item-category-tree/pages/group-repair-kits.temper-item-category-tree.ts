import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const groupRepairKits = {
  id: "01a05fcf-f81e-7a79-a87e-7098e36151e3",
  type: "page-type/temper-item-category-tree",
  slug: "group-repair-kits",
  title: "Group Repair Kits",
  parent: "temper-item-category-tree/repair-kits",
  displayOrder: 2,
  itemTypes: [71],
  createdAt: "2026-09-02T01:51:00.126Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
