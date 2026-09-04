import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPlanks = {
  id: "01a05fcf-f807-725c-85c8-f82955082be7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-planks",
  title: "Planks",
  parent: "furn-structures",
  displayOrder: 4,
  furnitureSubcategoryIds: [115],
} as const satisfies TemperItemCategoryTree
