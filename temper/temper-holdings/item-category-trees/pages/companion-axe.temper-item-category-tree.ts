import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionAxe = {
  id: "01a05fcf-f7c3-7465-8d1c-5a26ec243428",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-axe",
  title: "Axe",
  parent: "companion-one-handed",
  displayOrder: 1,
  weaponTypes: [1],
} as const satisfies TemperItemCategoryTree
