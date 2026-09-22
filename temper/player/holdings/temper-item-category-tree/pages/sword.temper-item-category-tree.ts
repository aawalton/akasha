import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const sword = {
  id: "01a05fcf-f843-7235-b067-cc91324a744f",
  type: "page-type/temper-item-category-tree",
  slug: "sword",
  title: "Sword",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 0,
  weaponTypes: [3],
} as const satisfies TemperItemCategoryTree
