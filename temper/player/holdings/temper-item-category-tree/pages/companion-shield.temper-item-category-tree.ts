import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionShield = {
  id: "01a05fcf-f7d0-7e6d-8571-7ad4e8cf600c",
  type: "page-type/temper-item-category-tree",
  slug: "companion-shield",
  title: "Shield",
  parent: "temper-item-category-tree/companion-armor",
  displayOrder: 0,
  equipTypes: [7],
  createdAt: "2026-09-02T01:51:00.048Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
