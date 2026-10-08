import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const surveyEnchanting = {
  id: "01a05fcf-f841-7612-aa69-eaf50924d736",
  type: "page-type/temper-item-category-tree",
  slug: "survey-enchanting",
  title: "Enchanting",
  parent: "temper-item-category-tree/survey-reports",
  displayOrder: 4,
  itemNameContains: "Enchanter",
  createdAt: "2026-09-02T01:51:00.161Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
