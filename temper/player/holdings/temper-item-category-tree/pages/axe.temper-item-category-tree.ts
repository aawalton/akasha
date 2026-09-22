import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const axe = {
  id: "01a05fcf-f7bd-7e9c-be75-9b631a734101",
  type: "page-type/temper-item-category-tree",
  slug: "axe",
  title: "Axe",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 1,
  weaponTypes: [1],
} as const satisfies TemperItemCategoryTree
