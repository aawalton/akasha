import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMusicBoxes = {
  id: "01a05fcf-f804-7481-ac22-e461eb193ed1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-music-boxes",
  title: "Music Boxes",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 8,
  furnitureSubcategoryIds: [181],
  createdAt: "2026-09-02T01:51:00.100Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
