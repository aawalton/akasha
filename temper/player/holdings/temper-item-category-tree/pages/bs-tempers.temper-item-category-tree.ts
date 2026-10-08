import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bsTempers = {
  id: "01a05fcf-f7bf-7255-870b-ff5e73951b38",
  type: "page-type/temper-item-category-tree",
  slug: "bs-tempers",
  title: "Tempers",
  parent: "temper-item-category-tree/blacksmithing",
  displayOrder: 3,
  itemTypes: [41],
  createdAt: "2026-09-02T01:51:00.031Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
