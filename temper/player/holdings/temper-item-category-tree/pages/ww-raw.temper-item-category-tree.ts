import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const wwRaw = {
  id: "01a05fcf-f84a-776e-b907-6753be8e5100",
  type: "page-type/temper-item-category-tree",
  slug: "ww-raw",
  title: "Raw Materials",
  parent: "temper-item-category-tree/woodworking",
  displayOrder: 1,
  itemTypes: [37],
} as const satisfies TemperItemCategoryTree
