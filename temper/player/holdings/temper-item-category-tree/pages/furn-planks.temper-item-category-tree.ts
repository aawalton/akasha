import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPlanks = {
  id: "01a05fcf-f807-725c-85c8-f82955082be7",
  type: "page-type/temper-item-category-tree",
  slug: "furn-planks",
  title: "Planks",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 4,
  furnitureSubcategoryIds: [115],
} as const satisfies TemperItemCategoryTree
