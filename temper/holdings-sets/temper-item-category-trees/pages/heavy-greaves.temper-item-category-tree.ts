import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const heavyGreaves = {
  id: "01a05fcf-f820-7ad7-b05c-e65043a8f7fe",
  type: "temper-item-category-tree",
  slug: "heavy-greaves",
  title: "Greaves",
  parent: "heavy-armor",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
