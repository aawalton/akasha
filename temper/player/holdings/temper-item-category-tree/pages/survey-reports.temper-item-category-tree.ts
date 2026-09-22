import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyReports = {
  id: "01a05fcf-f842-7d15-a365-b4161b544b3f",
  type: "page-type/temper-item-category-tree",
  slug: "survey-reports",
  title: "Survey Reports",
  parent: "temper-item-category-tree/tasks",
  displayOrder: 0,
  specializedItemTypes: [101],
} as const satisfies TemperItemCategoryTree
