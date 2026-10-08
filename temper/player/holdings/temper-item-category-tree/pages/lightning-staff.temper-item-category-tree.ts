import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightningStaff = {
  id: "01a05fcf-f829-7386-8d00-b9a35560931f",
  type: "page-type/temper-item-category-tree",
  slug: "lightning-staff",
  title: "Lightning Staff",
  parent: "temper-item-category-tree/destruction-staff",
  displayOrder: 2,
  weaponTypes: [15],
  createdAt: "2026-09-02T01:51:00.137Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
