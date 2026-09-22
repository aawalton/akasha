import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUndercroft = {
  id: "01a05fcf-f817-7e76-bef6-fa01ef91ef6a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-undercroft",
  title: "Undercroft",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 5,
  furnitureCategoryIds: [6],
} as const satisfies TemperItemCategoryTree
