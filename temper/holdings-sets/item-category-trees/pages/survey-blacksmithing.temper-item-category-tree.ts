import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const surveyBlacksmithing = {
  id: "01a05fcf-f841-7f63-8df3-019f364a06ce",
  pageTypeSlug: "temper-item-category-tree",
  slug: "survey-blacksmithing",
  title: "Blacksmithing",
  parent: "survey-reports",
  displayOrder: 0,
  itemNameContains: "Blacksmith",
} as const satisfies TemperItemCategoryTree
