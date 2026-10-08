import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const poisonSolvents = {
  id: "01a05fcf-f830-7722-80ea-c4ee4d577b09",
  type: "page-type/temper-item-category-tree",
  slug: "poison-solvents",
  title: "Poison Solvents",
  parent: "temper-item-category-tree/alchemy",
  displayOrder: 3,
  itemTypes: [58],
  createdAt: "2026-09-02T01:51:00.144Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
