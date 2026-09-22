import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionSword = {
  id: "01a05fcf-f7d0-7ea9-abca-36cca1f1b182",
  type: "page-type/temper-item-category-tree",
  slug: "companion-sword",
  title: "Sword",
  parent: "temper-item-category-tree/companion-one-handed",
  displayOrder: 0,
  weaponTypes: [3],
} as const satisfies TemperItemCategoryTree
