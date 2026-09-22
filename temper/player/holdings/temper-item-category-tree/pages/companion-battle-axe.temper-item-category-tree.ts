import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionBattleAxe = {
  id: "01a05fcf-f7c4-7583-a6de-ab6d692ef962",
  type: "page-type/temper-item-category-tree",
  slug: "companion-battle-axe",
  title: "Battle Axe",
  parent: "temper-item-category-tree/companion-two-handed",
  displayOrder: 1,
  weaponTypes: [5],
} as const satisfies TemperItemCategoryTree
