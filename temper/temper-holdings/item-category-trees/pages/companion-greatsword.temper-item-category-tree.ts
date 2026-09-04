import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionGreatsword = {
  id: "01a05fcf-f7c8-7ddf-b5e4-6891d30e7f49",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-greatsword",
  title: "Greatsword",
  parent: "companion-two-handed",
  displayOrder: 0,
  weaponTypes: [4],
} as const satisfies TemperItemCategoryTree
