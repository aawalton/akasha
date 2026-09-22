import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyBlacksmithing = {
  id: "01a05fcf-f841-7f63-8df3-019f364a06ce",
  type: "page-type/temper-item-category-tree",
  slug: "survey-blacksmithing",
  title: "Blacksmithing",
  parent: "temper-item-category-tree/survey-reports",
  displayOrder: 0,
  itemNameContains: "Blacksmith",
} as const satisfies TemperItemCategoryTree
