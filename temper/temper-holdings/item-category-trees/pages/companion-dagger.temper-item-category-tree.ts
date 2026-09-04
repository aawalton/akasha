import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionDagger = {
  id: "01a05fcf-f7c6-744d-aaa9-3e9d1b16e72c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-dagger",
  title: "Dagger",
  parent: "companion-one-handed",
  displayOrder: 3,
  weaponTypes: [11],
} as const satisfies TemperItemCategoryTree
