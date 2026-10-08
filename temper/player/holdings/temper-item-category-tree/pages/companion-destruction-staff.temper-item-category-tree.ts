import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionDestructionStaff = {
  id: "01a05fcf-f7c6-744b-a7d5-7cd76987c768",
  type: "page-type/temper-item-category-tree",
  slug: "companion-destruction-staff",
  title: "Destruction Staff",
  parent: "temper-item-category-tree/companion-weapons",
  displayOrder: 3,
  weaponTypes: [12, 13, 15],
  createdAt: "2026-09-02T01:51:00.038Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
