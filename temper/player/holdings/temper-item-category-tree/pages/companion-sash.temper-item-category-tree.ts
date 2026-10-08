import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionSash = {
  id: "01a05fcf-f7d0-7e3f-8675-9e6789b7f388",
  type: "page-type/temper-item-category-tree",
  slug: "companion-sash",
  title: "Sash",
  parent: "temper-item-category-tree/companion-light",
  displayOrder: 4,
  equipTypes: [8],
  createdAt: "2026-09-02T01:51:00.048Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
