import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const trophyDungeonBuffs = {
  id: "01a05fcf-f846-75b8-b1ae-c376746f9830",
  type: "page-type/temper-item-category-tree",
  slug: "trophy-dungeon-buffs",
  title: "Dungeon Buff Ingredients",
  parent: "temper-item-category-tree/trophies",
  displayOrder: 3,
  specializedItemTypes: [112],
} as const satisfies TemperItemCategoryTree
