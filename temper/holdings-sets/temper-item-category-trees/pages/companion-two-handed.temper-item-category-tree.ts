import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionTwoHanded = {
  id: "01a05fcf-f7d1-7e21-bf80-afb1ee3f62e2",
  type: "temper-item-category-tree",
  slug: "companion-two-handed",
  title: "Two-Handed",
  parent: "companion-weapons",
  displayOrder: 1,
  equipTypes: [6],
  weaponTypes: [4, 5, 6],
} as const satisfies TemperItemCategoryTree
