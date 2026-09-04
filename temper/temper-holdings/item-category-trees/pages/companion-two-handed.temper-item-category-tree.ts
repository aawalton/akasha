import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionTwoHanded = {
  id: "01a05fcf-f7d1-7e21-bf80-afb1ee3f62e2",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-two-handed",
  title: "Two-Handed",
  parent: "companion-weapons",
  displayOrder: 1,
  equipTypes: [6],
  weaponTypes: [4, 5, 6],
} as const satisfies TemperItemCategoryTree
