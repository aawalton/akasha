import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionMedium = {
  id: "01a05fcf-f7cd-70db-a3e4-284db40eda7c",
  type: "page-type/temper-item-category-tree",
  slug: "companion-medium",
  title: "Medium Armor",
  parent: "temper-item-category-tree/companion-armor",
  displayOrder: 2,
  armorTypes: [2],
  createdAt: "2026-09-02T01:51:00.045Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
