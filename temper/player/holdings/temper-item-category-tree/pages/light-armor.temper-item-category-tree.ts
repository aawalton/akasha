import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightArmor = {
  id: "01a05fcf-f826-74c2-9b85-d6d3b26d1006",
  type: "page-type/temper-item-category-tree",
  slug: "light-armor",
  title: "Light Armor",
  parent: "temper-item-category-tree/armor",
  displayOrder: 1,
  armorTypes: [1],
} as const satisfies TemperItemCategoryTree
