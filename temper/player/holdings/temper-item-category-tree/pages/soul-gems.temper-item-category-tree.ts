import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const soulGems = {
  id: "01a05fcf-f83f-7cf4-80ab-2fbe119c6723",
  type: "page-type/temper-item-category-tree",
  slug: "soul-gems",
  title: "Soul Gems",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 5,
  itemTypes: [19],
  createdAt: "2026-09-02T01:51:00.159Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
