import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const currencyAlliancePoints = {
  id: "01a05fcf-f7d6-7e80-b8de-eb4ede0bf0d4",
  type: "page-type/temper-item-category-tree",
  slug: "currency-alliance-points",
  title: "Alliance Points",
  parent: "temper-item-category-tree/currency",
  displayOrder: 1,
} as const satisfies TemperItemCategoryTree
