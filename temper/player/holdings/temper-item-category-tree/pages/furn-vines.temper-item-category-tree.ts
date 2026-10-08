import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnVines = {
  id: "01a05fcf-f819-76c6-bde3-bf4a2cfcc15d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-vines",
  title: "Vines",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 15,
  furnitureSubcategoryIds: [111],
  createdAt: "2026-09-02T01:51:00.121Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
