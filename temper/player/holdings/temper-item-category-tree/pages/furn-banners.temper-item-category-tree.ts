import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBanners = {
  id: "01a05fcf-f7e6-7feb-898a-5ef67556fdb1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-banners",
  title: "Banners",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 0,
  furnitureSubcategoryIds: [57],
  createdAt: "2026-09-02T01:51:00.070Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
