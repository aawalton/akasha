import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionLight = {
  id: "01a05fcf-f7cc-7d50-bac5-fe0f88a94b0d",
  type: "page-type/temper-item-category-tree",
  slug: "companion-light",
  title: "Light Armor",
  parent: "temper-item-category-tree/companion-armor",
  displayOrder: 1,
  armorTypes: [1],
  createdAt: "2026-09-02T01:51:00.044Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
