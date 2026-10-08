import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionPauldrons = {
  id: "01a05fcf-f7ce-7b3d-bf0d-ec6167434a48",
  type: "page-type/temper-item-category-tree",
  slug: "companion-pauldrons",
  title: "Pauldrons",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 2,
  equipTypes: [4],
  createdAt: "2026-09-02T01:51:00.046Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
