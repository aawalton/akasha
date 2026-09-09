import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const greatsword = {
  id: "01a05fcf-f81e-7e59-9636-2b0aaff61102",
  pageTypeSlug: "temper-item-category-tree",
  slug: "greatsword",
  title: "Greatsword",
  parent: "two-handed",
  displayOrder: 0,
  weaponTypes: [4],
} as const satisfies TemperItemCategoryTree
