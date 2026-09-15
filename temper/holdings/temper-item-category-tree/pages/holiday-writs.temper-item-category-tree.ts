import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const holidayWrits = {
  id: "01a05fcf-f821-755b-b8e2-09e355b349bb",
  type: "page-type/temper-item-category-tree",
  slug: "holiday-writs",
  title: "Holiday Writs",
  parent: "tasks",
  displayOrder: 1,
  specializedItemTypes: [2760],
} as const satisfies TemperItemCategoryTree
