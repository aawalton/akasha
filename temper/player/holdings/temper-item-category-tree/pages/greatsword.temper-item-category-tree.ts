import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const greatsword = {
  id: "01a05fcf-f81e-7e59-9636-2b0aaff61102",
  type: "page-type/temper-item-category-tree",
  slug: "greatsword",
  title: "Greatsword",
  parent: "temper-item-category-tree/two-handed",
  displayOrder: 0,
  weaponTypes: [4],
} as const satisfies TemperItemCategoryTree
