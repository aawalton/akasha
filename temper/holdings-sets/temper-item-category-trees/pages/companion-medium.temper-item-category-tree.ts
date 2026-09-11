import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionMedium = {
  id: "01a05fcf-f7cd-70db-a3e4-284db40eda7c",
  type: "temper-item-category-tree",
  slug: "companion-medium",
  title: "Medium Armor",
  parent: "companion-armor",
  displayOrder: 2,
  armorTypes: [2],
} as const satisfies TemperItemCategoryTree
