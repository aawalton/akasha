import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionArmor = {
  id: "01a05fcf-f7c2-7d8c-b4e6-3db47240f4a8",
  type: "temper-item-category-tree",
  slug: "companion-armor",
  title: "Armor",
  parent: "companion",
  displayOrder: 1,
  traitTypeRange: [43, 51],
} as const satisfies TemperItemCategoryTree
