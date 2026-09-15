import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSymbolicDecor = {
  id: "01a05fcf-f812-7118-b924-7c187d484a7d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-symbolic-decor",
  title: "Symbolic Decor",
  parent: "furn-undercroft",
  displayOrder: 6,
  furnitureSubcategoryIds: [105],
} as const satisfies TemperItemCategoryTree
