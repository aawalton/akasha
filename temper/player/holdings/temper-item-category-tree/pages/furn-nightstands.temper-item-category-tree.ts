import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnNightstands = {
  id: "01a05fcf-f805-7857-91c2-5dedd5b1bb82",
  type: "page-type/temper-item-category-tree",
  slug: "furn-nightstands",
  title: "Nightstands",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 5,
  furnitureSubcategoryIds: [144],
  createdAt: "2026-09-02T01:51:00.101Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
