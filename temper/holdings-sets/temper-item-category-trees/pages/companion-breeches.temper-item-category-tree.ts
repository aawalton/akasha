import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionBreeches = {
  id: "01a05fcf-f7c5-7742-b463-dbbff7bdf2ed",
  type: "temper-item-category-tree",
  slug: "companion-breeches",
  title: "Breeches",
  parent: "companion-light",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
