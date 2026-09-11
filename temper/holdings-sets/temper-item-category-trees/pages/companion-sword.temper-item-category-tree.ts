import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionSword = {
  id: "01a05fcf-f7d0-7ea9-abca-36cca1f1b182",
  type: "temper-item-category-tree",
  slug: "companion-sword",
  title: "Sword",
  parent: "companion-one-handed",
  displayOrder: 0,
  weaponTypes: [3],
} as const satisfies TemperItemCategoryTree
