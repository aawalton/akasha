import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSuite = {
  id: "01a05fcf-f811-739d-8c04-ad0b84b7356e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-suite",
  title: "Suite",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 0,
  furnitureCategoryIds: [2],
  createdAt: "2026-09-02T01:51:00.113Z",
  updatedAt: "2026-10-28T19:29:15.609Z",
} as const satisfies TemperItemCategoryTree
