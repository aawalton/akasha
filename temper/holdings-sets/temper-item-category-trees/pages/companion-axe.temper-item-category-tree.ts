import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionAxe = {
  id: "01a05fcf-f7c3-7465-8d1c-5a26ec243428",
  type: "temper-item-category-tree",
  slug: "companion-axe",
  title: "Axe",
  parent: "companion-one-handed",
  displayOrder: 1,
  weaponTypes: [1],
} as const satisfies TemperItemCategoryTree
