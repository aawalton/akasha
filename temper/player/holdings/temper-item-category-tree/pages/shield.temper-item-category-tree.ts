import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const shield = {
  id: "01a05fcf-f83b-7096-bf42-2c6f6bbb40d8",
  type: "page-type/temper-item-category-tree",
  slug: "shield",
  title: "Shield",
  parent: "temper-item-category-tree/armor",
  displayOrder: 0,
  weaponTypes: [14],
  createdAt: "2026-09-02T01:51:00.155Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
