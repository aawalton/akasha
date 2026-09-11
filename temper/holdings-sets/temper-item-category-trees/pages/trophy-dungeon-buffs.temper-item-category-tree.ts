import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const trophyDungeonBuffs = {
  id: "01a05fcf-f846-75b8-b1ae-c376746f9830",
  type: "temper-item-category-tree",
  slug: "trophy-dungeon-buffs",
  title: "Dungeon Buff Ingredients",
  parent: "trophies",
  displayOrder: 3,
  specializedItemTypes: [112],
} as const satisfies TemperItemCategoryTree
