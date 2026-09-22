import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mace = {
  id: "01a05fcf-f82a-7721-ac93-f75a3cceb0ba",
  type: "page-type/temper-item-category-tree",
  slug: "mace",
  title: "Mace",
  parent: "temper-item-category-tree/one-handed",
  displayOrder: 2,
  weaponTypes: [2],
} as const satisfies TemperItemCategoryTree
