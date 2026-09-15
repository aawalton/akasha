import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const poisonSolvents = {
  id: "01a05fcf-f830-7722-80ea-c4ee4d577b09",
  type: "temper-item-category-tree",
  slug: "poison-solvents",
  title: "Poison Solvents",
  parent: "alchemy",
  displayOrder: 3,
  itemTypes: [58],
} as const satisfies TemperItemCategoryTree
