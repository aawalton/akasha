import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWells = {
  id: "01a05fcf-f81b-7717-85c3-1a9ee1ee78ca",
  type: "page-type/temper-item-category-tree",
  slug: "furn-wells",
  title: "Wells",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 4,
  furnitureSubcategoryIds: [71],
} as const satisfies TemperItemCategoryTree
