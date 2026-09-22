import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const currencyWritVouchers = {
  id: "01a05fcf-f7d8-7bad-9497-caa78d4feb7c",
  type: "page-type/temper-item-category-tree",
  slug: "currency-writ-vouchers",
  title: "Writ Vouchers",
  parent: "temper-item-category-tree/currency",
  displayOrder: 3,
} as const satisfies TemperItemCategoryTree
