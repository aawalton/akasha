import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const scriptFocus = {
  id: "01a05fcf-f83a-72d4-b949-d4afaf5d4f15",
  type: "temper-item-category-tree",
  slug: "script-focus",
  title: "Focus",
  parent: "scripts",
  displayOrder: 0,
  specializedItemTypes: [3250],
} as const satisfies TemperItemCategoryTree
