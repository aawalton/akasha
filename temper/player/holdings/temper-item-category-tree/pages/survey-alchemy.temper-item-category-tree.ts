import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyAlchemy = {
  id: "01a05fcf-f840-7ff5-8c39-98b76154fcbe",
  type: "page-type/temper-item-category-tree",
  slug: "survey-alchemy",
  title: "Alchemy",
  parent: "temper-item-category-tree/survey-reports",
  displayOrder: 5,
  itemNameContains: "Alchemist",
  createdAt: "2026-09-02T01:51:00.160Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
