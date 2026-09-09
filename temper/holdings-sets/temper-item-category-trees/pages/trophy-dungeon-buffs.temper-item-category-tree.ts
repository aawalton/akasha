import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const trophyDungeonBuffs = {
  id: "01a05fcf-f846-75b8-b1ae-c376746f9830",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trophy-dungeon-buffs",
  title: "Dungeon Buff Ingredients",
  parent: "trophies",
  displayOrder: 3,
  specializedItemTypes: [112],
} as const satisfies TemperItemCategoryTree
