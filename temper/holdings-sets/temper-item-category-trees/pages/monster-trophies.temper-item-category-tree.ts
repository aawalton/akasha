import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const monsterTrophies = {
  id: "01a05fcf-f82d-7ab9-a641-c5e4f5db9f45",
  type: "temper-item-category-tree",
  slug: "monster-trophies",
  title: "Monster Trophies",
  parent: "treasures",
  displayOrder: 0,
  specializedItemTypes: [81],
} as const satisfies TemperItemCategoryTree
