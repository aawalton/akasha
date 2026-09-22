import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeBallista = {
  id: "01a05fcf-f83c-71be-9bad-351665fad7a1",
  type: "page-type/temper-item-category-tree",
  slug: "siege-ballista",
  title: "Ballista",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 4,
  specializedItemTypes: [401],
} as const satisfies TemperItemCategoryTree
