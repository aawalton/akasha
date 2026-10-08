import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionBow = {
  id: "01a05fcf-f7c5-7c56-bf15-b138e7133174",
  type: "page-type/temper-item-category-tree",
  slug: "companion-bow",
  title: "Bow",
  parent: "temper-item-category-tree/companion-weapons",
  displayOrder: 2,
  weaponTypes: [8],
  createdAt: "2026-09-02T01:51:00.037Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
