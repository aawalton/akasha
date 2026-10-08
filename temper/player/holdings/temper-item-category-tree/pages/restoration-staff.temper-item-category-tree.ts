import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const restorationStaff = {
  id: "01a05fcf-f838-778e-a9b5-94194af49d0f",
  type: "page-type/temper-item-category-tree",
  slug: "restoration-staff",
  title: "Restoration Staff",
  parent: "temper-item-category-tree/weapons",
  displayOrder: 4,
  weaponTypes: [9],
  createdAt: "2026-09-02T01:51:00.152Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
