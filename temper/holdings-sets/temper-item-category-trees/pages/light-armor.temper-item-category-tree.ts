import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const lightArmor = {
  id: "01a05fcf-f826-74c2-9b85-d6d3b26d1006",
  type: "temper-item-category-tree",
  slug: "light-armor",
  title: "Light Armor",
  parent: "armor",
  displayOrder: 1,
  armorTypes: [1],
} as const satisfies TemperItemCategoryTree
