import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnServices = {
  id: "01a05fcf-f80d-7a4e-9c73-b361cf7c0f7f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-services",
  title: "Services",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 14,
  furnitureCategoryIds: [24, 25],
} as const satisfies TemperItemCategoryTree
