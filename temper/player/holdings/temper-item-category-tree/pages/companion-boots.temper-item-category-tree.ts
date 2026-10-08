import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionBoots = {
  id: "01a05fcf-f7c4-7e13-80e8-8839e6770191",
  type: "page-type/temper-item-category-tree",
  slug: "companion-boots",
  title: "Boots",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 6,
  equipTypes: [10],
  createdAt: "2026-09-02T01:51:00.036Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
