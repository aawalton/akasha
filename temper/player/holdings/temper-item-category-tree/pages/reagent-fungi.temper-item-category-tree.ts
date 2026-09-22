import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const reagentFungi = {
  id: "01a05fcf-f834-7be1-8aa4-a223d564bf53",
  type: "page-type/temper-item-category-tree",
  slug: "reagent-fungi",
  title: "Fungi",
  parent: "temper-item-category-tree/reagents",
  displayOrder: 1,
  specializedItemTypes: [151],
} as const satisfies TemperItemCategoryTree
