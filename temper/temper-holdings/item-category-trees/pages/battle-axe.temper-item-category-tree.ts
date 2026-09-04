import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const battleAxe = {
  id: "01a05fcf-f7bd-7e58-8ca4-cdaee7498461",
  pageTypeSlug: "temper-item-category-tree",
  slug: "battle-axe",
  title: "Battle Axe",
  parent: "two-handed",
  displayOrder: 1,
  weaponTypes: [5],
} as const satisfies TemperItemCategoryTree
