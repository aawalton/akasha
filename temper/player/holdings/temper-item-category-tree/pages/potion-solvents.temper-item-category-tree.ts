import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const potionSolvents = {
  id: "01a05fcf-f831-73e6-ab75-9e2115bd7ed1",
  type: "page-type/temper-item-category-tree",
  slug: "potion-solvents",
  title: "Potion Solvents",
  parent: "temper-item-category-tree/alchemy",
  displayOrder: 2,
  itemTypes: [33],
  createdAt: "2026-09-02T01:51:00.145Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
