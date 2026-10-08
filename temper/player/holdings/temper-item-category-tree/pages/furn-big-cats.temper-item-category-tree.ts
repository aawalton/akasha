import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBigCats = {
  id: "01a05fcf-f7e9-7e92-990a-a1536f34f62f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-big-cats",
  title: "Big Cats",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 1,
  furnitureSubcategoryIds: [29],
  createdAt: "2026-09-02T01:51:00.073Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
