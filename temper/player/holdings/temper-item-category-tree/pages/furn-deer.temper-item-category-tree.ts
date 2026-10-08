import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDeer = {
  id: "01a05fcf-f7f1-7c4c-815f-e79af21007f3",
  type: "page-type/temper-item-category-tree",
  slug: "furn-deer",
  title: "Deer",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 4,
  furnitureSubcategoryIds: [192],
  createdAt: "2026-09-02T01:51:00.081Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
