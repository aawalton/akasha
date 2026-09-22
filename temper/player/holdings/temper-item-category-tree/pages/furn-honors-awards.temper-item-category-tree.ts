import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnHonorsAwards = {
  id: "01a05fcf-f7fa-7c2e-82f4-8494d13a8061",
  type: "page-type/temper-item-category-tree",
  slug: "furn-honors-awards",
  title: "Honors and Awards",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 3,
  furnitureSubcategoryIds: [147],
} as const satisfies TemperItemCategoryTree
