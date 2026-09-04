import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const axe = {
  id: "01a05fcf-f7bd-7e9c-be75-9b631a734101",
  pageTypeSlug: "temper-item-category-tree",
  slug: "axe",
  title: "Axe",
  parent: "one-handed",
  displayOrder: 1,
  weaponTypes: [1],
} as const satisfies TemperItemCategoryTree
