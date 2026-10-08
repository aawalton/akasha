import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionHelmet = {
  id: "01a05fcf-f7ca-7b44-83e7-ea3aa2bcdfa3",
  type: "page-type/temper-item-category-tree",
  slug: "companion-helmet",
  title: "Helmet",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 0,
  equipTypes: [1],
  createdAt: "2026-09-02T01:51:00.042Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
