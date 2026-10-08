import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const monsterTrophies = {
  id: "01a05fcf-f82d-7ab9-a641-c5e4f5db9f45",
  type: "page-type/temper-item-category-tree",
  slug: "monster-trophies",
  title: "Monster Trophies",
  parent: "temper-item-category-tree/treasures",
  displayOrder: 0,
  specializedItemTypes: [81],
  createdAt: "2026-09-02T01:51:00.141Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
