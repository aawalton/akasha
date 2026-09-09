import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionMaul = {
  id: "01a05fcf-f7cd-7673-9012-d33fdb37b7ea",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-maul",
  title: "Maul",
  parent: "companion-two-handed",
  displayOrder: 2,
  weaponTypes: [6],
} as const satisfies TemperItemCategoryTree
