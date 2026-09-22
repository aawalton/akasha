import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumArmor = {
  id: "01a05fcf-f82b-7fae-a5cc-90ddd9daad34",
  type: "page-type/temper-item-category-tree",
  slug: "medium-armor",
  title: "Medium Armor",
  parent: "temper-item-category-tree/armor",
  displayOrder: 2,
  armorTypes: [2],
} as const satisfies TemperItemCategoryTree
