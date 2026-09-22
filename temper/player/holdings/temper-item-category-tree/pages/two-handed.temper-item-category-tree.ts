import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const twoHanded = {
  id: "01a05fcf-f848-7098-8e8e-f3a609a0f647",
  type: "page-type/temper-item-category-tree",
  slug: "two-handed",
  title: "Two-Handed",
  parent: "temper-item-category-tree/weapons",
  displayOrder: 1,
  equipTypes: [6],
  weaponTypes: [4, 5, 6],
} as const satisfies TemperItemCategoryTree
