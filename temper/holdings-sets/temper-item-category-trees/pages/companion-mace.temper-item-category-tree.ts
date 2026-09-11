import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionMace = {
  id: "01a05fcf-f7cc-70d4-a7e7-46d06dce780e",
  type: "temper-item-category-tree",
  slug: "companion-mace",
  title: "Mace",
  parent: "companion-one-handed",
  displayOrder: 2,
  weaponTypes: [2],
} as const satisfies TemperItemCategoryTree
