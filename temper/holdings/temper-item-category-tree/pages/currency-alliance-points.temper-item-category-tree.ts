import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const currencyAlliancePoints = {
  id: "01a05fcf-f7d6-7e80-b8de-eb4ede0bf0d4",
  type: "temper-item-category-tree",
  slug: "currency-alliance-points",
  title: "Alliance Points",
  parent: "currency",
  displayOrder: 1,
} as const satisfies TemperItemCategoryTree
