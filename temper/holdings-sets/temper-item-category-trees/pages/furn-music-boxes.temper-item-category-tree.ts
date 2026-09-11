import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMusicBoxes = {
  id: "01a05fcf-f804-7481-ac22-e461eb193ed1",
  type: "temper-item-category-tree",
  slug: "furn-music-boxes",
  title: "Music Boxes",
  parent: "furn-services",
  displayOrder: 8,
  furnitureSubcategoryIds: [181],
} as const satisfies TemperItemCategoryTree
