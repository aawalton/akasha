import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionMace = {
  id: "01a05fcf-f7cc-70d4-a7e7-46d06dce780e",
  type: "page-type/temper-item-category-tree",
  slug: "companion-mace",
  title: "Mace",
  parent: "temper-item-category-tree/companion-one-handed",
  displayOrder: 2,
  weaponTypes: [2],
} as const satisfies TemperItemCategoryTree
