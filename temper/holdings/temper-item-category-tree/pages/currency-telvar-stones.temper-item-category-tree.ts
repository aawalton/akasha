import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const currencyTelvarStones = {
  id: "01a05fcf-f7d8-7268-a73f-6481ac40ed5e",
  type: "page-type/temper-item-category-tree",
  slug: "currency-telvar-stones",
  title: "Tel Var Stones",
  parent: "currency",
  displayOrder: 2,
} as const satisfies TemperItemCategoryTree
