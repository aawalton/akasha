import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnCookware = {
  id: "01a05fcf-f7ed-7740-87db-5c18f0c6dcae",
  type: "page-type/temper-item-category-tree",
  slug: "furn-cookware",
  title: "Cookware",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 3,
  furnitureSubcategoryIds: [150],
  createdAt: "2026-09-02T01:51:00.077Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
