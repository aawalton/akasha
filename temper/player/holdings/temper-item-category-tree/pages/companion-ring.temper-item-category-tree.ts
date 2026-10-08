import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionRing = {
  id: "01a05fcf-f7cf-72f7-9105-7710429ea987",
  type: "page-type/temper-item-category-tree",
  slug: "companion-ring",
  title: "Ring",
  parent: "temper-item-category-tree/companion-jewelry",
  displayOrder: 1,
  equipTypes: [12],
  createdAt: "2026-09-02T01:51:00.047Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
