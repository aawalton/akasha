import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bsRefined = {
  id: "01a05fcf-f7bf-7086-8fef-0a87dd846477",
  type: "page-type/temper-item-category-tree",
  slug: "bs-refined",
  title: "Refined Materials",
  parent: "temper-item-category-tree/blacksmithing",
  displayOrder: 2,
  specializedItemTypes: [1550],
  createdAt: "2026-09-02T01:51:00.031Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
