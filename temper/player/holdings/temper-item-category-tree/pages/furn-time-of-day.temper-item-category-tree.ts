import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTimeOfDay = {
  id: "01a05fcf-f814-7e3d-8968-3fc230d4fe2b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-time-of-day",
  title: "Time of Day Control",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 12,
  furnitureSubcategoryIds: [202],
} as const satisfies TemperItemCategoryTree
