import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionJewelry = {
  id: "01a05fcf-f7cb-79bd-bfd5-2d64810cf866",
  type: "page-type/temper-item-category-tree",
  slug: "companion-jewelry",
  title: "Jewelry",
  parent: "temper-item-category-tree/companion",
  displayOrder: 2,
  traitTypeRange: [52, 60],
  createdAt: "2026-09-02T01:51:00.043Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
