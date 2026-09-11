import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const siegeBallista = {
  id: "01a05fcf-f83c-71be-9bad-351665fad7a1",
  type: "temper-item-category-tree",
  slug: "siege-ballista",
  title: "Ballista",
  parent: "siege-equipment",
  displayOrder: 4,
  specializedItemTypes: [401],
} as const satisfies TemperItemCategoryTree
