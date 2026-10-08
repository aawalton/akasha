import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionBelt = {
  id: "01a05fcf-f7c4-7d93-a545-ab117aef14e2",
  type: "page-type/temper-item-category-tree",
  slug: "companion-belt",
  title: "Belt",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 4,
  equipTypes: [8],
  createdAt: "2026-09-02T01:51:00.036Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
