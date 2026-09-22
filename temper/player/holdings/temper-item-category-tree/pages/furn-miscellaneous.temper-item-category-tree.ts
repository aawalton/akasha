import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMiscellaneous = {
  id: "01a05fcf-f802-7787-bde1-10a25a83356f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-miscellaneous",
  title: "Miscellaneous",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 12,
  furnitureCategoryIds: [13, 14],
} as const satisfies TemperItemCategoryTree
