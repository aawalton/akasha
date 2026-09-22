import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnHearth = {
  id: "01a05fcf-f7fa-790b-bfd9-0189337fbf46",
  type: "page-type/temper-item-category-tree",
  slug: "furn-hearth",
  title: "Hearth",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 6,
  furnitureCategoryIds: [7],
} as const satisfies TemperItemCategoryTree
