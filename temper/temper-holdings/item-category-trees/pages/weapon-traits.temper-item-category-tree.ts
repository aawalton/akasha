import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const weaponTraits = {
  id: "01a05fcf-f848-7c90-b064-4116216e4dd9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "weapon-traits",
  title: "Weapon Traits",
  parent: "trait-items",
  displayOrder: 1,
  itemTypes: [46],
} as const satisfies TemperItemCategoryTree
