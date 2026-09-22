import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const battleAxe = {
  id: "01a05fcf-f7bd-7e58-8ca4-cdaee7498461",
  type: "page-type/temper-item-category-tree",
  slug: "battle-axe",
  title: "Battle Axe",
  parent: "temper-item-category-tree/two-handed",
  displayOrder: 1,
  weaponTypes: [5],
} as const satisfies TemperItemCategoryTree
