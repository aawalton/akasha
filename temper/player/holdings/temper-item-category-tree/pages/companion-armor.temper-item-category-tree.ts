import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionArmor = {
  id: "01a05fcf-f7c2-7d8c-b4e6-3db47240f4a8",
  type: "page-type/temper-item-category-tree",
  slug: "companion-armor",
  title: "Armor",
  parent: "temper-item-category-tree/companion",
  displayOrder: 1,
  traitTypeRange: [43, 51],
  createdAt: "2026-09-02T01:51:00.034Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
