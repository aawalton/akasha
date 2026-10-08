import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const reagentFungi = {
  id: "01a05fcf-f834-7be1-8aa4-a223d564bf53",
  type: "page-type/temper-item-category-tree",
  slug: "reagent-fungi",
  title: "Fungi",
  parent: "temper-item-category-tree/reagents",
  displayOrder: 1,
  specializedItemTypes: [151],
  createdAt: "2026-09-02T01:51:00.148Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
