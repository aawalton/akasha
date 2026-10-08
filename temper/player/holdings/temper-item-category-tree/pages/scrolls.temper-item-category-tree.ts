import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const scrolls = {
  id: "01a05fcf-f83b-78ec-88c9-71ce9addceec",
  type: "page-type/temper-item-category-tree",
  slug: "scrolls",
  title: "Scrolls",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 9,
  specializedItemTypes: [105],
  createdAt: "2026-09-02T01:51:00.155Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
