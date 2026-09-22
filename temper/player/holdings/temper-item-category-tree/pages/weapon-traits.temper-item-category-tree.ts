import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const weaponTraits = {
  id: "01a05fcf-f848-7c90-b064-4116216e4dd9",
  type: "page-type/temper-item-category-tree",
  slug: "weapon-traits",
  title: "Weapon Traits",
  parent: "temper-item-category-tree/trait-items",
  displayOrder: 1,
  itemTypes: [46],
} as const satisfies TemperItemCategoryTree
