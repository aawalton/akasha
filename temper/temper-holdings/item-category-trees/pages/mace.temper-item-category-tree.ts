import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mace = {
  id: "01a05fcf-f82a-7721-ac93-f75a3cceb0ba",
  pageTypeSlug: "temper-item-category-tree",
  slug: "mace",
  title: "Mace",
  parent: "one-handed",
  displayOrder: 2,
  weaponTypes: [2],
} as const satisfies TemperItemCategoryTree
